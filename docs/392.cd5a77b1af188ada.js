"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[392],{9392:(U,d,a)=>{a.r(d),a.d(d,{MessagesComponent:()=>Z});var _=a(6223),c=a(6814),p=a(7282),u=a(3166),C=a(3403),m=a(7012),e=a(5879),x=a(5476),b=a(2425);function f(o,g){1&o&&(e.TgZ(0,"div",13)(1,"h3"),e._uU(2,"No messages"),e.qZA()())}function h(o,g){if(1&o&&(e.TgZ(0,"div"),e._UZ(1,"img",24),e.TgZ(2,"strong",25),e._uU(3),e.ALo(4,"titlecase"),e.qZA()()),2&o){const n=e.oxw().$implicit;e.xp6(1),e.Q6J("src",n.senderProfilePictureUrl||"./assets/images/default-user-img.png",e.LSH)("alt",n.senderUserName),e.xp6(2),e.Oqu(e.lcZ(4,3,n.senderUserName))}}function O(o,g){if(1&o&&(e.TgZ(0,"div"),e._UZ(1,"img",24),e.TgZ(2,"strong"),e._uU(3),e.ALo(4,"titlecase"),e.qZA()()),2&o){const n=e.oxw().$implicit;e.xp6(1),e.Q6J("src",n.senderProfilePictureUrl||"./assets/images/default-user-img.png",e.LSH)("alt",n.senderUserName),e.xp6(2),e.Oqu(e.lcZ(4,3,n.senderUserName))}}const M=function(){return{tab:3}};function P(o,g){if(1&o){const n=e.EpF();e.TgZ(0,"tr",19)(1,"td"),e._uU(2),e.qZA(),e.TgZ(3,"td",20),e.YNc(4,h,5,5,"div",21),e.YNc(5,O,5,5,"div",21),e.qZA(),e.TgZ(6,"td"),e._uU(7),e.ALo(8,"timeago"),e.qZA(),e.TgZ(9,"td")(10,"button",22),e.NdJ("click",function(t){return t.stopPropagation()})("click",function(){const i=e.CHM(n).$implicit,r=e.oxw(2);return e.KtG(r.deleteMessage(i.id))}),e._UZ(11,"i",23),e._uU(12," Delete "),e.qZA()()()}if(2&o){const n=g.$implicit,s=e.oxw(2);e.Q6J("queryParams",e.DdM(9,M)),e.xp6(2),e.Oqu(n.content),e.xp6(1),e.Q6J("queryParams",e.DdM(10,M))("routerLink","Outbox"===s.container?"/member/"+n.recipientUserName:"/member/"+n.senderUserName),e.xp6(1),e.Q6J("ngIf","Outbox"===s.container),e.xp6(1),e.Q6J("ngIf","Outbox"!==s.container),e.xp6(2),e.Oqu(e.lcZ(8,7,n.messageSend))}}function v(o,g){if(1&o&&(e.TgZ(0,"div",14)(1,"table",15)(2,"thead")(3,"tr")(4,"th",16),e._uU(5,"Message"),e.qZA(),e.TgZ(6,"th",17),e._uU(7),e.qZA(),e.TgZ(8,"th",17),e._uU(9),e.qZA(),e.TgZ(10,"th",17),e._uU(11,"Action"),e.qZA()()(),e.TgZ(12,"tbody"),e.YNc(13,P,13,11,"tr",18),e.qZA()()()),2&o){const n=e.oxw();e.xp6(7),e.Oqu("Outbox"===n.container?"To":"From"),e.xp6(2),e.Oqu("Outbox"===n.container?"Sent":"Received"),e.xp6(4),e.Q6J("ngForOf",n.messages)}}function T(o,g){if(1&o){const n=e.EpF();e.TgZ(0,"div",26)(1,"pagination",27),e.NdJ("ngModelChange",function(t){e.CHM(n);const i=e.oxw();return e.KtG(i.pagination.currentPage=t)})("pageChanged",function(t){e.CHM(n);const i=e.oxw();return e.KtG(i.pageChanged(t))}),e.qZA()()}if(2&o){const n=e.oxw();e.xp6(1),e.Q6J("boundaryLinks",!0)("totalItems",n.pagination.totalItems)("itemsPerPage",n.pagination.itemsPerPage)("ngModel",n.pagination.currentPage)("maxSize",3)}}const l=function(o){return{"btn-active":o}};let Z=(()=>{class o{constructor(n,s){this._messageService=n,this._toastrService=s,this.container="UnRead",this.pageNumber=1,this.pageSize=8}ngOnInit(){this.loadMessages()}loadMessages(){this._messageService.getMessages(this.pageNumber,this.pageSize,this.container).subscribe({next:n=>{n&&(this.messages=n.result,this.pagination=n.pagination)},error:n=>{console.log(n)}})}pageChanged(n){this.pageNumber=n.page,this.loadMessages()}deleteMessage(n){this._messageService.deleteMessage(n).subscribe({next:()=>{let s=this.messages?.findIndex(t=>t.id===n);s&&this.messages?.splice(s,1),this._toastrService.success("Message deleted successfully")},error:s=>{console.log(s)}})}static#e=this.\u0275fac=function(s){return new(s||o)(e.Y36(x.e),e.Y36(b._W))};static#n=this.\u0275cmp=e.Xpm({type:o,selectors:[["app-messages"]],standalone:!0,features:[e.jDz],decls:16,vars:18,consts:[[1,"container"],[1,"row","justify-content-center","my-3"],[1,"col-md-6","text-center"],["name","container",1,"group"],["btnRadio","UnRead",1,"btn","btn-custom",3,"ngClass","disabled","ngModel","ngModelChange","click"],[1,"fa","fa-envelope"],["btnRadio","Inbox",1,"btn","btn-custom",3,"ngClass","disabled","ngModel","ngModelChange","click"],[1,"fa","fa-envelope-open"],["btnRadio","Outbox",1,"btn","btn-custom",3,"ngClass","disabled","ngModel","ngModelChange","click"],[1,"fa","fa-paper-plane"],["class","row text-center",4,"ngIf"],["class","row",4,"ngIf"],["class","d-flex justify-content-center",4,"ngIf"],[1,"row","text-center"],[1,"row"],[1,"table","table-hover","text-center"],[2,"width","40%"],[2,"width","20%"],[3,"queryParams",4,"ngFor","ngForOf"],[3,"queryParams"],[2,"cursor","pointer",3,"queryParams","routerLink"],[4,"ngIf"],[1,"btn","btn-outline-danger",3,"click"],[1,"fas","fa-trash","mx-1"],[1,"img-circle","object-fit-cover","rounded-circle","mx-2",3,"src","alt"],[1,"mx-2"],[1,"d-flex","justify-content-center"],["previousText","\u2039","nextText","\u203a","firstText","\xab","lastText","\xbb",3,"boundaryLinks","totalItems","itemsPerPage","ngModel","maxSize","ngModelChange","pageChanged"]],template:function(s,t){1&s&&(e.TgZ(0,"div",0)(1,"div",1)(2,"div",2)(3,"div",3)(4,"button",4),e.NdJ("ngModelChange",function(r){return t.container=r})("click",function(){return t.loadMessages()}),e._UZ(5,"i",5),e._uU(6," UnRead "),e.qZA(),e.TgZ(7,"button",6),e.NdJ("ngModelChange",function(r){return t.container=r})("click",function(){return t.loadMessages()}),e._UZ(8,"i",7),e._uU(9," Inbox "),e.qZA(),e.TgZ(10,"button",8),e.NdJ("ngModelChange",function(r){return t.container=r})("click",function(){return t.loadMessages()}),e._UZ(11,"i",9),e._uU(12," Outbox "),e.qZA()()()(),e.YNc(13,f,3,0,"div",10),e.YNc(14,v,14,3,"div",11),e.YNc(15,T,2,5,"div",12),e.qZA()),2&s&&(e.xp6(4),e.Q6J("ngClass",e.VKq(12,l,"UnRead"===t.container))("disabled","UnRead"===t.container)("ngModel",t.container),e.xp6(3),e.Q6J("ngClass",e.VKq(14,l,"Inbox"===t.container))("disabled","Inbox"===t.container)("ngModel",t.container),e.xp6(3),e.Q6J("ngClass",e.VKq(16,l,"Outbox"===t.container))("disabled","Outbox"===t.container)("ngModel",t.container),e.xp6(3),e.Q6J("ngIf",0===(null==t.messages?null:t.messages.length)),e.xp6(1),e.Q6J("ngIf",(null==t.messages?null:t.messages.length)>0),e.xp6(1),e.Q6J("ngIf",(null==t.pagination?null:t.pagination.totalItems)>7))},dependencies:[c.ez,c.mk,c.sg,c.O5,c.rS,_.u5,_.JJ,_.On,C.rH,p.Fq,p.lz,m.u3,m.Qt,u.$L,u.wr],styles:[".img-circle[_ngcontent-%COMP%]{width:3rem;height:3rem}.container[_ngcontent-%COMP%]{padding:20px}@media (max-width: 576px){.container[_ngcontent-%COMP%]{padding:10px}}.text-center[_ngcontent-%COMP%]{margin-bottom:20px}.group[_ngcontent-%COMP%]{display:flex;justify-content:center;flex-wrap:wrap}.group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{background-color:#ffc107;border-color:#ffc107;color:#000;transition:background-color .3s,border-color .3s,color .3s;margin:5px}.group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]:hover, .group[_ngcontent-%COMP%]   .btn-active[_ngcontent-%COMP%]{background-color:#e0a800;border-color:#e0a800;color:#fff}.table-hover[_ngcontent-%COMP%]{width:100%;margin-top:20px;border-collapse:collapse}.table-hover[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table-hover[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:12px;border-bottom:1px solid #ddd;text-align:center}@media (max-width: 576px){.table-hover[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], .table-hover[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{padding:8px}}.table-hover[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{background-color:#ffc107;color:#000}@media (max-width: 576px){.table-hover[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{font-size:14px}}@media (max-width: 576px){.table-hover[_ngcontent-%COMP%]   td[_ngcontent-%COMP%]{font-size:12px}}.img-circle[_ngcontent-%COMP%]{width:40px;height:40px}.pagination[_ngcontent-%COMP%]{margin-top:20px}@media (max-width: 576px){.group[_ngcontent-%COMP%]{width:100%;flex-wrap:nowrap}.group[_ngcontent-%COMP%]   .btn[_ngcontent-%COMP%]{width:100%;margin-bottom:10px}.group[_ngcontent-%COMP%]   .btn-block[_ngcontent-%COMP%]{width:100%}.btn-custom[_ngcontent-%COMP%]{margin-bottom:10px;width:100%}}"]})}return o})()}}]);