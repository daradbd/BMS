(function () {
    "use strict";

    angular
        .module("companyManagement")
        .controller("CompanyListCtrl",
                    CompanyListCtrl);

    function CompanyListCtrl() {
        var vm = this; 
        vm.Comments = [{ "ID": 0, "Text": "I sat here trying really hard to think of something profound to write for my comment but was left with nothing interesting to say other than this droning on and on that I'm doing right now. But sometimes, droning on and on serves a purpose. For example, this comment appears more realistic without resorting to Lorem Ipsum.", "Author": "Phil", "Email": "haacked@gmail.com", "GravatarUrl": "http://www.gravatar.com/avatar/cdf546b601bf29a7eb4ca777544d11cd?s=40&r=g&d=retro" }, { "ID": 1, "Text": "This is the best thing I've ever seen! And trust me, I've seen a lot. A whole lot.", "Author": "Henrik", "Email": "henrikn@microsoft.com", "GravatarUrl": "http://www.gravatar.com/avatar/0141ff535bb199148d83b02290109bc0?s=40&r=g&d=retro" }, { "ID": 2, "Text": "Is this thing on? Because if it isn't on, we should really consider turning it on. Have you tried turning it on? I haven't. But you should consider it.", "Author": "Eilon", "Email": "elipton@microsoft.com", "GravatarUrl": "http://www.gravatar.com/avatar/7455ceb519e4df79962adeb4e0bb7f60?s=40&r=g&d=retro" }, { "ID": 3, "Text": "My computer's cupholder doesn't work, can you help? I tried calling tech support, but they keep laughing and I don't understand why. It's really not helpful.", "Author": "Glenn", "Email": "gblock@microsoft.com", "GravatarUrl": "http://www.gravatar.com/avatar/d372d9c0ab35dbe84c6d0a6902ae0594?s=40&r=g&d=retro" }]

    }



}());