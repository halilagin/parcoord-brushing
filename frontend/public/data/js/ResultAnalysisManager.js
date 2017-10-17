/**
 * Created by halil on 05/10/2017.
 */

var ResultAnalysisManager=function (){

  this.urls={
    "fetchParticipantData":"http://"+remoteHost+":5000/parcoord/userints/fetchParticipant",
    "searchByTestName":"http://"+remoteHost+":5000/parcoord/userints/searchByTestName",
};

  this.template = `
    <div class="expresults_container">
      <div class="expresults_searcharea">
        <div>
          <label for="expresults_searcharea_searchtext"> Test name </label>
          <input id="expresults_searcharea_searchtext" class="expresults_searcharea_searchtext" type="text"/>
          <input class="expresults_searcharea_btn_search" type="button" value="Search"/>
        </div>
      </div>
    
    </div>
    <div class="expresults_tables">
         <div class="expresults_tests">
            <table cellpadding="0" cellspacing="0" border="0" class="display expresults_tbl_testnames" >
                 <tbody></tbody>
            </table>
          </div>
          <div>
          <input class="expresults_btn_showEligibility" type="button" value="show Elibitility Test"/>
          <input class="expresults_btn_showDebriefing" type="button" value="show Debriefing Test"/>
          
          </div>
    </div>
    
    <div>
      <input class="resanmng_btn_fetchParticipantData" value="Get Participant data"/>
    </div>
    
    
`;

  this.init = function() {


    $("body").append(this.template);
    $(".resanmng_btn_fetchParticipantData").click(()=>{

      var params = JSON.stringify({
        "id":22
      });

      $.post(this.urls.fetchParticipantData, params, (data)=>{
        var d = JSON.parse( data );
        $("body").append(d.debriefing);

        console.log( d);
      });
    });





    $(".expresults_searcharea_btn_search").click(()=>{

      var params = JSON.stringify({
        "testName":$(".expresults_searcharea_searchtext").val()
      });

      $.post(this.urls.searchByTestName, params, (data)=>{
        var d = JSON.parse( data );


        //$(".expresults_tbl_testnames").clear();
        var table = $(".expresults_tbl_testnames").DataTable({
          //"processing": true,
          // "ajax": {
          //   "processing": true,
          //   "url": "{% url 'my_ajax_url' %}",
          //   "dataSrc": ""
          // },

          data:d,
          "columns": [
            { "data": "pk" },
            { "data": "fields.testName" },
            { "data": "fields.testDate" }

          ]
          } );


        $('.expresults_tbl_testnames tbody').on( 'click', 'tr', function () {
          $(this).toggleClass('selected');
        } );



        $(".expresults_btn_showEligibility").click(()=>{
          //var table = $(".expresults_tbl_testnames").dataTable();

          //alert( table.rows('.selected').data().length +' row(s) selected' );


          $(".expresult_dlg_eligibility").dialog("destroy");
          $(".expresult_dlg_eligibility").remove();

          var personDataStr = table.rows('.selected').data()[0].fields.data.replace(/\"/g, '\\"').replace(/\'/g, '"');
          console.log(personDataStr);
          var personData = JSON.parse(personDataStr);
          var eligibility= personData.shortListTest;
          console.log(eligibility);
          var dialogHTML = `<div class="expresult_dlg_eligibility" title="Eligibility test">${eligibility}</div>`;

          $("body").append(dialogHTML);
          $(".expresult_dlg_eligibility").find(".checked").prop("checked", true);
          $(".expresult_dlg_eligibility").dialog({
            autoOpen:true,
            width:500
          });

        });








      $(".expresults_btn_showDebriefing").click(()=>{
        //var table = $(".expresults_tbl_testnames").dataTable();

        //alert( table.rows('.selected').data().length +' row(s) selected' );


        $(".expresult_dlg_debriefing").dialog("destroy");
        $(".expresult_dlg_debriefing").remove();

        var personDataStr = table.rows('.selected').data()[0].fields.data.replace(/\"/g, '\\"').replace(/\'/g, '"');
        console.log(personDataStr);
        var personData = JSON.parse(personDataStr);
        var debriefing= personData.debriefing[0];
        console.log(debriefing);
        var dialogHTML = `<div class="expresult_dlg_debriefing" title="Debriefing test">${debriefing}</div>`;

        $("body").append(dialogHTML);
        $(".expresult_dlg_debriefing").find(".checked").prop("checked", true);
        $(".expresult_dlg_debriefing").dialog({
          autoOpen:true,
          width:500
        });

      });


    });


    });//end of post


  };


  this.init();

};


var resultAnalysisManager = new ResultAnalysisManager();


