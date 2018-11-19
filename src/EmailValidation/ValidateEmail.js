// adds html when the notice is needed
function showInvalidNotice() {
    ("#myForm").append('<div id="invalidEmail" class="col-xs-12 alert alert-warning alert-dismissible " role="alert"> <button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button>       <strong>Invalid Email</strong></div>');
}

// validation
function validateEmail(){
    let validate_email = ('input[name=email]').val();
    console.log("fired");
    if( /(.+)@(.+){2,}\.(.+){2,}/.test(validate_email) ){
    } else {
        showInvalidNotice();
    }
}