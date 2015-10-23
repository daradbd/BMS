using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using BMS.Models;
using BMS.Models.Accounting.Configuration.Accounts;
using BMS.Models.Accounting.Transaction;

namespace BMS.Controllers
{
    public class ControlVoucher
    {
        LoginUser loginUser = new LoginUser();
        private UsersContext db = new UsersContext();
        public long CreateVoucher(long DRCoaID,long CRCoaID,decimal Amount,long VoucherTypeID,DateTime TranDate)
        {
            VoucherList DrVoucher = new VoucherList();
            VoucherList CrVoucher = new VoucherList();
            long? VoucherNo = db.VoucherLists.Where(v => v.CompanyID == loginUser.CompanyID).Select(v => v.VoucherNo).Max();
            DrVoucher.COAID = DRCoaID;
            DrVoucher.Amount = Amount;
            DrVoucher.DrCr = true;
            DrVoucher.CompanyID = loginUser.CompanyID;
            DrVoucher.VoucherTypeID = VoucherTypeID;
            DrVoucher.TranDate = TranDate;
            DrVoucher.StatusID = 0;
            DrVoucher.VoucherNo = VoucherNo > 0 ? VoucherNo + 1 : 1;
            DrVoucher.InsertBy = loginUser.UserID;
            DrVoucher.InsertDate = DateTime.Now;

            db.VoucherLists.Add(DrVoucher);
            db.SaveChanges();

           // CrVoucher = DrVoucher;
            CrVoucher.COAID = CRCoaID;
            CrVoucher.DrCr = false;
            CrVoucher.Amount = Amount;
            CrVoucher.CompanyID = loginUser.CompanyID;
            CrVoucher.VoucherTypeID = VoucherTypeID;
            CrVoucher.TranDate = TranDate;
            CrVoucher.StatusID = 0;
            CrVoucher.VoucherNo = VoucherNo > 0 ? VoucherNo + 1 : 1;
            CrVoucher.InsertBy = loginUser.UserID;
            CrVoucher.InsertDate = DateTime.Now;
            db.VoucherLists.Add(CrVoucher);
            db.SaveChanges();

            return (long)CrVoucher.VoucherNo;
        }

        //internal void CreateVoucher(long p1, long CustomerCOAID, decimal? nullable1, long p2, DateTime? nullable2)
        //{
        //    throw new NotImplementedException();
        //}
    }
}