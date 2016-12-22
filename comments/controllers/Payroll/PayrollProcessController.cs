using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web;
using System.Web.Http;
using BMS.Models.Payroll;
using BMS.Models;
using System.Data.SqlClient;

namespace BMS.Controllers.Payroll
{
    public class PayrollProcessController : ApiController
    {
        private UsersContext db = new UsersContext();

        // GET api/PayrollProcess
        public IEnumerable<PayrollProcess> GetPayrollProcesses()
        {
            return db.PayrollProcesses.AsEnumerable();
        }

        // GET api/PayrollProcess/5
        public PayrollProcess GetPayrollProcess(long id)
        {
            PayrollProcess payrollprocess = db.PayrollProcesses.Find(id);
            if (payrollprocess == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return payrollprocess;
        }

        // PUT api/PayrollProcess/5
        public HttpResponseMessage PutPayrollProcess(long id, PayrollProcess payrollprocess)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != payrollprocess.PayrollProcessID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(payrollprocess).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
                db.Database.ExecuteSqlCommand("DELETE FROM Payroll_PayrollProcessDescriptions WHERE PayrollProcessID = @PayrollProcessID", new SqlParameter("PayrollProcessID", payrollprocess.PayrollProcessID));

                long basicID = db.SalaryComponentMappings.Where(b => b.SalaryComponentConfigID == 1).Select(b => b.SalaryComponentID).SingleOrDefault();
                long otherID = db.SalaryComponentMappings.Where(b => b.SalaryComponentConfigID == 2).Select(b => b.SalaryComponentID).SingleOrDefault();
                long overTimeID = db.SalaryComponentMappings.Where(b => b.SalaryComponentConfigID == 3).Select(b => b.SalaryComponentID).SingleOrDefault();
                long CasualLeaveID = db.SalaryComponentMappings.Where(b => b.SalaryComponentConfigID == 4).Select(b => b.SalaryComponentID).SingleOrDefault();

                var result = db.Collaborators.Where(e => e.IsEmployee == true)
                       .GroupJoin(db.AttendanceAudits.Where(a => a.MonthYear == payrollprocess.MonthYear),
                                  n => n.CollaboratorID,
                                  m => m.EmployeeID,
                                  (n, ms) => new { n, ms = ms.DefaultIfEmpty() })
                       .SelectMany(z => z.ms.Select(m => new
                       {
                           Employee = z.n,
                           EmployeeID = z.n.CollaboratorID,
                           AttendanceAuditID = m.AttendanceAuditID == null ? 0 : m.AttendanceAuditID,
                           DaysWorked = m.DaysWorked == null ? 0 : m.DaysWorked,
                           EarnedLeave = m.EarnedLeave == null ? 0 : m.EarnedLeave,
                           CasualLeave = m.CasualLeave == null ? 0 : m.CasualLeave,
                           LateAttendance = m.LateAttendance == null ? 0 : m.LateAttendance,
                           OverTime = m.OverTime == null ? 0 : m.OverTime

                       }));

                foreach (var item in result.ToList())
                {
                    var salaryComponentInfo = db.SalaryComponentDescriptions.Where(s => s.EmployeeID == item.EmployeeID && s.ComponentValue > 0);

                    decimal basicAmount = db.SalaryComponentDescriptions.Where(s => s.EmployeeID == item.EmployeeID && s.SalaryComponentID == basicID).Select(b => b.ComponentValue).SingleOrDefault();

                    foreach (var salaryComponent in salaryComponentInfo.ToList())
                    {
                        PayrollProcessDescription payrollProcessDescription = new PayrollProcessDescription();
                        payrollProcessDescription.EmployeeID = item.EmployeeID;
                        payrollProcessDescription.ComponentValue = salaryComponent.ComponentValue;
                        payrollProcessDescription.SalaryComponentID = salaryComponent.SalaryComponentID;
                        payrollProcessDescription.PayrollProcessID = payrollprocess.PayrollProcessID;
                        db.PayrollProcessDescriptions.Add(payrollProcessDescription);
                        db.SaveChanges();

                    }

                    if (overTimeID > 0)
                    {
                        PayrollProcessDescription payrollProcessOvertime = new PayrollProcessDescription();
                        payrollProcessOvertime.EmployeeID = item.EmployeeID;
                        payrollProcessOvertime.ComponentValue = (basicAmount / (decimal)240) * (decimal)item.OverTime * (decimal)2;
                        payrollProcessOvertime.SalaryComponentID = overTimeID;
                        payrollProcessOvertime.PayrollProcessID = payrollprocess.PayrollProcessID;
                        db.PayrollProcessDescriptions.Add(payrollProcessOvertime);
                        db.SaveChanges();
                    }

                    if (CasualLeaveID > 0)
                    {
                        PayrollProcessDescription payrollProcessCasualLeave = new PayrollProcessDescription();
                        payrollProcessCasualLeave.EmployeeID = item.EmployeeID;
                        payrollProcessCasualLeave.ComponentValue = ((decimal)item.Employee.CTCAmount / (decimal)30) * (decimal)item.CasualLeave;
                        payrollProcessCasualLeave.SalaryComponentID = CasualLeaveID;
                        payrollProcessCasualLeave.PayrollProcessID = payrollprocess.PayrollProcessID;
                        db.PayrollProcessDescriptions.Add(payrollProcessCasualLeave);
                        db.SaveChanges();
                    }

                    if (otherID > 0)
                    {
                        int LateDate = ((int)item.LateAttendance / Convert.ToInt32(payrollprocess.LatePolicy));
                        PayrollProcessDescription payrollProcessOtherdeduction = new PayrollProcessDescription();
                        payrollProcessOtherdeduction.EmployeeID = item.EmployeeID;
                        payrollProcessOtherdeduction.ComponentValue = ((decimal)item.Employee.CTCAmount / (decimal)30) * ((decimal)LateDate);
                        payrollProcessOtherdeduction.SalaryComponentID = otherID;
                        payrollProcessOtherdeduction.PayrollProcessID = payrollprocess.PayrollProcessID;
                        db.PayrollProcessDescriptions.Add(payrollProcessOtherdeduction);
                        db.SaveChanges();
                    }




                }
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/PayrollProcess
        public HttpResponseMessage PostPayrollProcess(PayrollProcess payrollprocess)
        {
            if (ModelState.IsValid)
            {
                PayrollProcess pp = db.PayrollProcesses.Where(p => p.MonthYear == payrollprocess.MonthYear).SingleOrDefault();
                if(pp!=null)
                {
                    if (pp.PayrollProcessID > 0)
                    {
                        db.Database.ExecuteSqlCommand("DELETE FROM Payroll_PayrollProcessDescriptions WHERE PayrollProcessID = @PayrollProcessID", new SqlParameter("PayrollProcessID", payrollprocess.PayrollProcessID));
                   
                    }
                }
                
                else
                {
                    db.PayrollProcesses.Add(payrollprocess);
                    db.SaveChanges();
                }

                
                long basicID = db.SalaryComponentMappings.Where(b => b.SalaryComponentConfigID == 1).Select(b => b.SalaryComponentID).SingleOrDefault();
                long otherID = db.SalaryComponentMappings.Where(b => b.SalaryComponentConfigID == 2).Select(b => b.SalaryComponentID).SingleOrDefault();
                long overTimeID = db.SalaryComponentMappings.Where(b => b.SalaryComponentConfigID == 3).Select(b => b.SalaryComponentID).SingleOrDefault();
                long CasualLeaveID = db.SalaryComponentMappings.Where(b => b.SalaryComponentConfigID == 4).Select(b => b.SalaryComponentID).SingleOrDefault();

                var result = db.Collaborators.Where(e => e.IsEmployee == true)
                       .GroupJoin(db.AttendanceAudits.Where(a => a.MonthYear == payrollprocess.MonthYear),
                                  n => n.CollaboratorID,
                                  m => m.EmployeeID,
                                  (n, ms) => new { n, ms = ms.DefaultIfEmpty() })
                       .SelectMany(z => z.ms.Select(m => new
                       {
                           Employee = z.n,
                           EmployeeID = z.n.CollaboratorID,
                           AttendanceAuditID = m.AttendanceAuditID == null ? 0 : m.AttendanceAuditID,
                           DaysWorked = m.DaysWorked == null ? 0 : m.DaysWorked,
                           EarnedLeave = m.EarnedLeave == null ? 0 : m.EarnedLeave,
                           CasualLeave = m.CasualLeave == null ? 0 : m.CasualLeave,
                           LateAttendance = m.LateAttendance == null ? 0 : m.LateAttendance,
                           OverTime = m.OverTime == null ? 0 : m.OverTime

                       }));

                foreach (var item in result.ToList())
                {
                    var salaryComponentInfo = db.SalaryComponentDescriptions.Where(s => s.EmployeeID == item.EmployeeID && s.ComponentValue>0);

                    decimal basicAmount = db.SalaryComponentDescriptions.Where(s => s.EmployeeID == item.EmployeeID && s.SalaryComponentID==basicID).Select(b=>b.ComponentValue).SingleOrDefault();

                    foreach (var salaryComponent in salaryComponentInfo.ToList())
                    {
                        PayrollProcessDescription payrollProcessDescription = new PayrollProcessDescription();
                        payrollProcessDescription.EmployeeID = item.EmployeeID;
                        payrollProcessDescription.ComponentValue = salaryComponent.ComponentValue;
                        payrollProcessDescription.SalaryComponentID = salaryComponent.SalaryComponentID;
                        payrollProcessDescription.PayrollProcessID = payrollprocess.PayrollProcessID;
                        db.PayrollProcessDescriptions.Add(payrollProcessDescription);
                        db.SaveChanges();
                        
                    }

                    if (overTimeID > 0)
                    {
                        PayrollProcessDescription payrollProcessOvertime = new PayrollProcessDescription();
                        payrollProcessOvertime.EmployeeID = item.EmployeeID;
                        payrollProcessOvertime.ComponentValue =(basicAmount/(decimal)240)*(decimal)item.OverTime*(decimal)2;
                        payrollProcessOvertime.SalaryComponentID = overTimeID;
                        payrollProcessOvertime.PayrollProcessID = payrollprocess.PayrollProcessID;
                        db.PayrollProcessDescriptions.Add(payrollProcessOvertime);
                        db.SaveChanges();
                    }
                    
                    if(CasualLeaveID>0)
                    {
                        PayrollProcessDescription payrollProcessCasualLeave = new PayrollProcessDescription();
                        payrollProcessCasualLeave.EmployeeID = item.EmployeeID;
                        payrollProcessCasualLeave.ComponentValue = ((decimal)item.Employee.CTCAmount / (decimal)30) * (decimal)item.CasualLeave;
                        payrollProcessCasualLeave.SalaryComponentID = CasualLeaveID;
                        payrollProcessCasualLeave.PayrollProcessID = payrollprocess.PayrollProcessID;
                        db.PayrollProcessDescriptions.Add(payrollProcessCasualLeave);
                        db.SaveChanges();
                    }
                   
                    if(otherID>0)
                    {
                        int LateDate=((int)item.LateAttendance / Convert.ToInt32(payrollprocess.LatePolicy));
                        PayrollProcessDescription payrollProcessOtherdeduction = new PayrollProcessDescription();
                        payrollProcessOtherdeduction.EmployeeID = item.EmployeeID;
                        payrollProcessOtherdeduction.ComponentValue = ((decimal)item.Employee.CTCAmount / (decimal)30) * ((decimal)LateDate);
                        payrollProcessOtherdeduction.SalaryComponentID = otherID;
                        payrollProcessOtherdeduction.PayrollProcessID = payrollprocess.PayrollProcessID;
                        db.PayrollProcessDescriptions.Add(payrollProcessOtherdeduction);
                        db.SaveChanges();
                    }

                    


                }
                

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, payrollprocess);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = payrollprocess.PayrollProcessID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/PayrollProcess/5
        public HttpResponseMessage DeletePayrollProcess(long id)
        {
            PayrollProcess payrollprocess = db.PayrollProcesses.Find(id);
            if (payrollprocess == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.PayrollProcesses.Remove(payrollprocess);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, payrollprocess);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}