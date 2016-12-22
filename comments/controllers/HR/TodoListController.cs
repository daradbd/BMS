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
using BMS.Models.HR;
using BMS.Models;

namespace BMS.Controllers.HR
{
    public class TodoListController : ApiController
    {
        private UsersContext db = new UsersContext();
        private LoginUser loginUser = new LoginUser();

        // GET api/TodoList
        public IEnumerable<TodoList> GetTodoLists()
        {
            return db.TodoLists.AsEnumerable();
        }

        // GET api/TodoList/5
        public TodoList GetTodoList(long id)
        {
            TodoList todolist = db.TodoLists.Find(id);
            if (todolist == null)
            {
                throw new HttpResponseException(Request.CreateResponse(HttpStatusCode.NotFound));
            }

            return todolist;
        }

        // PUT api/TodoList/5
        public HttpResponseMessage PutTodoList(long id, TodoList todolist)
        {
            if (!ModelState.IsValid)
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }

            if (id != todolist.TodoListID)
            {
                return Request.CreateResponse(HttpStatusCode.BadRequest);
            }

            db.Entry(todolist).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        // POST api/TodoList
        public HttpResponseMessage PostTodoList(TodoList todolist)
        {
            if (ModelState.IsValid)
            {
                todolist.InsertBy = loginUser.UserID;
                todolist.InsertDate = DateTime.Now;
                db.TodoLists.Add(todolist);
                db.SaveChanges();

                HttpResponseMessage response = Request.CreateResponse(HttpStatusCode.Created, todolist);
                response.Headers.Location = new Uri(Url.Link("DefaultApi", new { id = todolist.TodoListID }));
                return response;
            }
            else
            {
                return Request.CreateErrorResponse(HttpStatusCode.BadRequest, ModelState);
            }
        }

        // DELETE api/TodoList/5
        public HttpResponseMessage DeleteTodoList(long id)
        {
            TodoList todolist = db.TodoLists.Find(id);
            if (todolist == null)
            {
                return Request.CreateResponse(HttpStatusCode.NotFound);
            }

            db.TodoLists.Remove(todolist);

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.NotFound, ex);
            }

            return Request.CreateResponse(HttpStatusCode.OK, todolist);
        }

        protected override void Dispose(bool disposing)
        {
            db.Dispose();
            base.Dispose(disposing);
        }
    }
}