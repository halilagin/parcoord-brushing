/**
 * Created by halil on 05/10/2017.
 */

var ResultAnalysisManager=function (){

  this.urls={
    "fetchParticipantData":"http://"+remoteHost+":5000/parcoord/userints/fetchParticipant",

};

  this.template = `
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

  };


  this.init();

};


var resultAnalysisManager = new ResultAnalysisManager();


