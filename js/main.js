
jQuery(document).ready(function(){
    
    "use_strict";
    window.localStorage.removeItem('documentname');
    let today = new Date();
    let year = today.getFullYear();
    $('.pyear').text(year);
     // $("a").on('click', function (event) {
        //     if (this.hash !== "") {
        //     event.preventDefault();
        //     var hash = this.hash;
        //     $('html, body').animate({
        //         scrollTop: $(hash).offset().top
        //     }, 800, function () {
        //         window.location.hash = hash;
        //     });
        //     }
        // });
        $(".scroll-ball").on('click', function (event) {
            if (this.hash !== "") {
            event.preventDefault();
            var hash = this.hash;
            $('html, body').animate({
                scrollTop: $('body').offset().top
            }, 200, function () {
                window.location.hash = hash;
            });
            }
        });
        $("#submitApplication").on('click', function (event) {
            registerApplicant(event);
        });
        $("#submitQualification").on('click', function (event) {
            addQualification(event);
        });

        $('#finishApplication').on('click', function(e){
            $('#previewModal').modal('show');
            get_application_details(e);
        });

        $('#previewModal').on('shown.bs.modal', function () {
            $('#myinput').trigger('focus');
        });

        // $('#previewModal').modal({
        //     keyboard: false
        // })

        
});

function addQualification(e) {
    e.preventDefault();
    
    $.blockUI({ message: '<h1><img src="images/busy.gif" style="width:80px; height:80px;"/> Just a moment...</h1>' });
    let formData = new FormData(qualificationForm);
    formData.append('owner_id', window.localStorage.getItem('applicantId'));
    formData.append('action', 'qualifications');
    let requestUrl = '../rsuth_api/index.php';
    $.ajax({
        url: requestUrl,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (resp) {
            $.unblockUI();
            let json = JSON.parse(resp);   
            console.log(json); 
            if(json.statuscode == 1) {
                $.alert(json.status);
                $('html,body').animate({
                    scrollTop: $("#upload-section").offset().top},
                    'slow');
            } else {
                $.alert(json.status);
                console.log(json.status);
            }         
        }
    });
}
function get_application_details(e) {
    e.preventDefault();
    
    $.blockUI({ message: '<h1><img src="images/busy.gif" style="width:100px; height:100px;"/> Just a moment...</h1>' });   
    let requestUrl = '../rsuth_api/index.php';
    $.ajax({
        type: 'POST',
        url: requestUrl,
        data:{id: window.localStorage.getItem('applicantId'),
        action: 'get_applications'},
        // processData: false,
        // contentType: false,
        success: function (resp) {
            $.unblockUI();
            let json = JSON.parse(resp);   
            console.log(json);
            
            if(json.statuscode == 1) {
                // $('#apptitle').text(json.status);
                $('#report-container').html = "";
                let data = json.data[0]; 
                let keyindex = Object.keys(data);
                let valindex = Object.values(data);
                let keys = Object.keys(varFields);
                let vals = Object.values(varFields);
                $.each(keyindex, function(k, v){
                    if(keys[k] == keyindex[k]) {
                        let render = `<div class="row">
                            <div class="col-sm-4 col-md-4 col-lg-4">
                                <label id="${keys[k]}" class="form-label pl-4 text-uppercase">${vals[k]}</label>
                            </div>
                            <div class="col-sm-8 col-md-8 col-lg-8">
                                <label id="${keys[k]+k}" class="form-label text-secondary">${valindex[k]}</label>
                            </div>
                        </div>`;
                        $('#report-container').append(render);                        
                    }                     
                });                
                let dirName = json.data[0].firstname + json.data[0].lastname + json.data[0].id;
                window.localStorage.setItem('dirName', dirName);
                get_documents(e);
                get_qualifications(e);
            } else {
                $.alert(json.status);
                console.log(json.status);
            }         
        }
    });
}
get_qualifications = function (e) {
    e.preventDefault();
    
    $.blockUI({ message: '<h1><img src="images/busy.gif" style="width:100px; height:100px;"/> Just a moment...</h1>' });
    
    let requestUrl = '../rsuth_api/index.php';    
    $.ajax({
        type: 'POST',
        url: requestUrl,
        data:{id: window.localStorage.getItem('applicantId'),
        action: 'get_qualifications'},
        // processData: false,
        // contentType: false,
        // async: false,
        success: function (resp) {
            $.unblockUI();
            let json = JSON.parse(resp);   
            console.log(json); 
            let keys = Object.keys(qualifFields);
            let vals = Object.values(qualifFields);
            let data = Object.values(json.data[0]);
            let datakey = Object.keys(json.data[0]);
            if(json.statuscode == 1) {                                                  
                let i = 0;
                // $.each(qualifFields, function(idx, v){
                // console.log(idx.length, json.data); 
                    for(let c = 0; c < keys.length; c++){
                        if(keys[c] == datakey[c]) {
                            
                        console.log(c, datakey[c]);                        
                            let qualifRender = `<div class="row">
                                <div class="col-sm-4 col-md-4 col-lg-4">
                                    <label id="${keys[c]}" class="form-label pl-4 text-uppercase">${vals[c]}</label>
                                </div>
                                <div class="col-sm-8 col-md-8 col-lg-8">
                                    <label id="${keys[c]+c}" class="form-label text-secondary">${data[c]}</label>
                                </div>
                            </div>`;
                            // alert(qualifRender);
                            $('#qualifications_container').append(qualifRender); 
                        }
                    }
                // });
            } else {
               data = json.status;
            }         
        }
    });
}
function get_documents(e) {
    e.preventDefault();
    
    $.blockUI({ message: '<h1><img src="images/busy.gif" style="width:100px; height:100px;"/> Just a moment...</h1>' });
    
    let requestUrl = '../rsuth_api/index.php';
    $.ajax({
        type: 'POST',
        url: requestUrl,
        data:{id: window.localStorage.getItem('applicantId'),
        action: 'get_documents'},
        success: function (resp) {
            $.unblockUI();
            let json = JSON.parse(resp); 
            let dirName = window.localStorage.getItem('dirName');  
            console.log(json); 
            if(json.statuscode == 1) {
                $('#report-container').html = "";
                for(let c = 0; c < json.data.length; c++) {
                    let render = `
                        <li class="list-group-item"><a href="#">${json.data[c].filename}</a></li>
                    `;
                    $('#documents_list').append(render);                
                    img = new Image();
                    if(json.data[c].filename == "passportphotograph.jpg"){
                        img.src = "../uploadedFiles/"+dirName+'/'+json.data[c].filename;
                        document.querySelector('.passport-photo').src = img.src;
                    }                
                }
                $('#qrcode').qrcode({ 
                    width: 100,
                    height: 100,
                    render : "canvas", 
                    text : dirName
                });                
            } else {
                $.alert(json.status);
                console.log(json.status);
            }         
        }
    });
}

function registerApplicant(e) {
    e.preventDefault();
    
    $.blockUI({ message: '<h1><img src="images/busy.gif" style="width:80px; height:80px;"/> Just a moment...</h1>' });
    let formData = new FormData(applicationForm);
    formData.append('action', 'applications');
    let requestUrl = '../rsuth_api/index.php';
    $.ajax({
        url: requestUrl,
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function (resp) {
            $.unblockUI();
            let json = JSON.parse(resp);   
            console.log(json); 
            if(json.statuscode == 1) {
                let appname = json.data.data[0].firstname+json.data.data[0].lastname;
                window.localStorage.setItem('applicantId', json.data.data[0].id);
                window.localStorage.setItem('applicantname', appname);
                $.alert(json.status);
                $('html,body').animate({
                    scrollTop: $("#qualification-section").offset().top},
                    'slow');
            } else {
                $.alert(json.status);
                console.log(json.status);
            }         
        }
    });
}

$('#documentname').on('change', function(e){
    let value = $(this).find('option:selected').text();
    window.localStorage.setItem('documentname', value);
});
//********* Document uploads   ************ 

Dropzone.autoDiscover = false;
$("#my-awesome-dropzone").dropzone({
    url: "http://localhost/rsuth_interns_program/rsuth_api/index.php",
    action: "upload_documents",
    parallelUploads: 1,
    paramName: 'file',
    params: {actionkey:"proposer"},
    uploadMultiple: false,
    maxFiles: 1,
    acceptedFiles: ".jpg, .png, .pdf, .jpeg",
    maxFilesize: 3145728,
    autoProcessQueue: false,
    autoQueue: false,
    init: function () {
        this.on("error", function (file, response) {
        var json = JSON.parse(response);
            $.alert(json.status);
        });
        this.on("canceled", function (file,response) {
            isFileInProgress = false;
            window.onbeforeunload = function () { /* unbind */ };
        });
        this.on('success', function (file, response) {
            console.log(response);
            try {
                var json = JSON.parse(response);
                if (json.statuscode != 0) {
                    $.alert(json.status);
                    this.removeFile(file);
                } else {
                    $.alert(json.status);
                }
            } catch (e) {
                console.log(e.message);
            }
        });
        this.on('addedfile', function (a) {
            this.options.params = {
                "owner_id": window.localStorage.getItem('applicantId'),
                "applicantname": window.localStorage.getItem('applicantname'),
                "documentname": window.localStorage.getItem('documentname'),
                "action": "uploaddocuments",
            };
            this.processFile(a);
        });
    },
});
