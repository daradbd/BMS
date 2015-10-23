using BMS.Models;
using BMS.Models.Accounting.Configuration.Accounts;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BMS.Controllers
{
    public class ControlCOA
    {
        private UsersContext db = new UsersContext();

        //public  long CreateCOA(string headFor, long ParentCOAID)
        //{
        //    long COAID = ParentCOAID;
        //    //var query=from x in 
        //    return COAID;
        //}


        public long CreateCOA(string headFor, long coaid)
        {
            
            LoginUser loginUser=new LoginUser();

            long COAID = 0;
            long? CompanyID = loginUser.CompanyID;
            var query =( from x in db.AccCOAMappings
                        from y in db.AccCOAs
                        .Where(p =>(p.COAID == x.AccCOAID))
                        .DefaultIfEmpty()
                         select new { x.AccCOAID, x.Prefix, x.Suffix, x.CreateChild, y.COACode,y.COAName, y.HasChild, y.BalanceType, y.AccTypeID, y.CompanyID, y.CompanyBranchID, x.AccCOAConfigID }).Where(c => c.AccCOAConfigID == coaid && c.CompanyID == CompanyID).SingleOrDefault();
            if (query != null)
            {
                if (query.CreateChild == true)
                {
                    int? MaxCode = Convert.ToInt32((db.AccCOAs.Where(r => r.ParentCOAID == query.AccCOAID).Select(r => r.COACode).ToList()).Max());
                    AccCOA accCOA = new AccCOA();
                    accCOA.AccTypeID = query.AccTypeID;
                    accCOA.BalanceType = query.BalanceType;
                    accCOA.CompanyID = query.CompanyID;
                    accCOA.CompanyBranchID = query.CompanyBranchID;
                    accCOA.COAName = query.Prefix + headFor + query.Suffix+":"+query.COAName;
                    accCOA.COACode = MaxCode > 0 ? (MaxCode + 1).ToString() : query.COACode.ToString() + "001";
                    accCOA.ParentCOAID =(long)query.AccCOAID;
                    db.AccCOAs.Add(accCOA);
                    db.SaveChanges();
                    COAID = accCOA.COAID;
                }
                else
                {
                    COAID = Convert.ToInt64(query.AccCOAID);
                }
            }
            return COAID;
        }

        public List<AccCOA> SearchCOAIDs(long parentsID)
        {
            List<AccCOA> AccCOAList = new List<AccCOA>();

            var parentsIDs = new long[] { parentsID };
            int i = 1;

            while (i == 1)
            {

                var result = (from s in db.AccCOAs
                              where parentsIDs.Contains(s.ParentCOAID)
                              select s);
               

                if (result.Count()>0)
                {
                    AccCOAList.AddRange(result.ToList());
                    parentsIDs = result.Select(p => p.COAID).ToArray();
                }
                else
                {
                    i = 0;
                }



            }
            return AccCOAList;
        }
    }
}