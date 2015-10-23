﻿using System.Collections.Generic;

namespace BMS.Models
{
    public interface ICommentRepository
    {
        IEnumerable<Comment> Get();
        bool TryGet(int id, out Comment comment);
        Comment Add(Comment comment);
        bool Delete(int id);
        bool Update(Comment comment);
    }
}
