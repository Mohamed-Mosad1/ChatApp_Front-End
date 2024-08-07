"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[707],{5707:(b,m,n)=>{n.r(m),n.d(m,{LoginComponent:()=>E});var c=n(6814),e=n(6223),d=n(7988),_=n(3403),u=n(7362),g=n(7114),t=n(5879),p=n(304),f=n(2425);function h(s,P){if(1&s){const o=t.EpF();t.TgZ(0,"form",13),t.NdJ("ngSubmit",function(){t.CHM(o);const r=t.oxw();return t.KtG(r.confirmToSendEmail())}),t.TgZ(1,"div",14)(2,"h4",15),t._uU(3,"Forget your Password?"),t.qZA(),t.TgZ(4,"p"),t._uU(5,"Please provide your E-mail we will send you a link to reset your password."),t.qZA()(),t.TgZ(6,"div",16),t._UZ(7,"app-text-input",17),t.qZA(),t.TgZ(8,"div",18)(9,"button",19),t.NdJ("click",function(){t.CHM(o);const r=t.oxw();return t.KtG(null==r.modalRef?null:r.modalRef.hide())}),t._uU(10," Close "),t.qZA(),t.TgZ(11,"button",20),t._uU(12," Send "),t.qZA()()()}if(2&s){const o=t.oxw();t.Q6J("formGroup",o.forgetPassword),t.xp6(7),t.Q6J("formControl",o.forgetPassword.controls.email)}}let E=(()=>{class s{constructor(o,i,r,l,a){this._authService=o,this._formBuilder=i,this._router=r,this._toastrService=l,this.modalService=a}ngOnInit(){this.initializeForm()}initializeForm(){this.loginForm=this._formBuilder.group({userNameOrEmail:["",[e.kI.required,e.kI.minLength(3)]],password:["",[e.kI.required,e.kI.pattern("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{6,}$")]]}),this.forgetPassword=this._formBuilder.group({email:["",[e.kI.required,e.kI.pattern("^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$")]]})}login(){this.loginForm.invalid?this._toastrService.error("Please fill out the form correctly."):this._authService.login(this.loginForm.value).subscribe({next:()=>{this._toastrService.success("Logged in successfully"),this._router.navigate(["/members"])},error:o=>{this.handleErrorResponse(o)}})}confirmToSendEmail(){this.forgetPassword.invalid&&this._toastrService.error("Please enter your email correctly."),this.forgetPassword.valid&&(console.log(this.forgetPassword.get("email")?.value),this._authService.sendResetPasswordLink(this.forgetPassword.get("email")?.value).subscribe({next:o=>{this.modalRef?.hide(),this._toastrService.success(`${o}`),console.log(o)},error:o=>{this.handleErrorResponse(o)}}))}openModal(o){this.modalRef=this.modalService.show(o)}handleErrorResponse(o){o.error&&o.error.errors&&Array.isArray(o.error.errors)?o.error.errors.forEach(i=>{this._toastrService.error(i)}):this._toastrService.error(200!==o.status?"Invalid Email or Password":"An unexpected error occurred")}static#t=this.\u0275fac=function(i){return new(i||s)(t.Y36(p.e),t.Y36(e.qu),t.Y36(_.F0),t.Y36(f._W),t.Y36(u.tT))};static#o=this.\u0275cmp=t.Xpm({type:s,selectors:[["app-login"]],standalone:!0,features:[t.jDz],decls:19,vars:4,consts:[[1,"row","justify-content-center"],[1,"text-center","text-primary"],[1,"col-sm-10","col-md-8","col-lg-5","col-10","mb-3",3,"formGroup","ngSubmit"],["type","text","label","UserName or Email",3,"formControl"],["type","password","label","Password",3,"formControl"],[1,"d-flex"],["type","button",1,"btn","btn-link","ms-auto","fw-bold",3,"click"],[1,"form-group","text-center","mt-3"],["type","submit",1,"btn","btn-success","me-2",3,"disabled"],[1,"fas","fa-right-to-bracket","mx-1"],["type","button","routerLink","/home",1,"btn","btn-warning"],[1,"fas","fa-right-left","mx-1"],["template",""],[3,"formGroup","ngSubmit"],[1,"modal-header","flex-wrap"],[1,"modal-title","pull-left"],[1,"modal-body"],["type","email","label","Email to reset password",3,"formControl"],[1,"modal-footer"],["type","button","aria-label","Close",1,"btn","btn-secondary","close","pull-right",3,"click"],["type","submit",1,"btn","btn-success"]],template:function(i,r){if(1&i){const l=t.EpF();t.TgZ(0,"div",0)(1,"h2",1),t._uU(2,"Login"),t.qZA(),t.TgZ(3,"form",2),t.NdJ("ngSubmit",function(){return r.login()}),t._UZ(4,"hr")(5,"app-text-input",3)(6,"app-text-input",4),t.TgZ(7,"div",5)(8,"a",6),t.NdJ("click",function(){t.CHM(l);const v=t.MAs(18);return t.KtG(r.openModal(v))}),t._uU(9,"Forgot Password?"),t.qZA()(),t.TgZ(10,"div",7)(11,"button",8),t._UZ(12,"i",9),t._uU(13," Login "),t.qZA(),t.TgZ(14,"button",10),t._UZ(15,"i",11),t._uU(16," Cancel "),t.qZA()()()(),t.YNc(17,h,13,2,"ng-template",null,12,t.W1O)}2&i&&(t.xp6(3),t.Q6J("formGroup",r.loginForm),t.xp6(2),t.Q6J("formControl",r.loginForm.controls.userNameOrEmail),t.xp6(1),t.Q6J("formControl",r.loginForm.controls.password),t.xp6(5),t.Q6J("disabled",r.loginForm.invalid))},dependencies:[c.ez,e.UX,e._Y,e.JJ,e.JL,e.oH,e.sg,g.t,u.zk,d.Tx,_.rH],styles:["mat-form-field[_ngcontent-%COMP%]{width:inherit}"]})}return s})()}}]);