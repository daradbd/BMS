using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Web;
using System.Data.Entity;
using System.Data.Objects;
using BMS.Models;
using BMS.Models.Accounting.Configuration.Accounts;

namespace BMS.Controllers
{
    public static class UDF
    {
       
        public static T MaxOrEmpty<T>(this IQueryable<T> query)
        {
            return query.DefaultIfEmpty().Max();
        }

        public static Int64 LoginUserID { get; set; }

        //public static ObjectQuery<T> Include<T>(this ObjectQuery<T> query,Expression<Func<T,object>> selector)
        //{
        //    MemberExpression body = selector.Body as MemberExpression;
        //    return query.Include(body.Member.Name);
        //}


    }
}