/**
 * Created by halil on 05/10/2017.
 */


var SurveyShortListManager=function (){
  this.q3=`
           <div class="sslmanager_dialog_q">
              <div class="sslmanager_dialog_q_text">If the correlation coefficient between two variables is 0.2 (Pearson correlation), what can be deduced about the relation between these variables (Reminder, Coefficient value can be between -1 and 1)

              </div>
              
              <div class="sslmanager_dialog_q_choices multiple_answer">
                
                <div class="sslmanager_dialog_q_choice">
                  <label><input class="sslmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                    The variables are noisy
                  </label>
                </div>
                
                <div class="sslmanager_dialog_q_choice">
                  <label><input class="sslmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                    The variables are correlated positively
                  </label>
                </div>

                
                <div class="sslmanager_dialog_q_choice">
                  <label><input class="sslmanager_dialog_cb" type="checkbox" value="-10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                    There is a high correlation between the variables.

                  </label>
                </div>
                <div class="sslmanager_dialog_q_choice">
                  <label><input class="sslmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                    There is no relation or correlation between the variables.

                  </label>
                </div>
                <div class="sslmanager_dialog_q_choice">
                  <label><input class="sslmanager_dialog_cb" type="checkbox" value="0" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                    Nothing can be deduced

                  </label>
                </div>
                <div class="sslmanager_dialog_q_choice">
                  <label><input class="sslmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                    Linearly correlated but further examination should be performed to identify non-linear correlation
                  </label>
                </div>
                <div class="sslmanager_dialog_q_choice">
                  <label><input class="sslmanager_dialog_cb" type="checkbox" value="-10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                    Negatively correlated

                  </label>
                </div>
                <div class="sslmanager_dialog_q_choice">
                  <label><input class="sslmanager_dialog_cb" type="checkbox" value="-10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                    There is a high negative correlation.
                  </label>
                </div>
                <div class="sslmanager_dialog_q_choice">
                  <label><input class="sslmanager_dialog_cb" type="checkbox" value="-10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                    20% of instances of the variables are correlated.
                  </label>
                </div>
                <div class="sslmanager_dialog_q_choice">
                  <label><input class="sslmanager_dialog_cb" type="checkbox" value="0" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                    Pearson correlation is not enough to deduce any relation between the variables.


                  </label>
                </div>
                
                
              </div>
            </div>`;


  this.q4 = `
  <div class="sslmanager_dialog_q">
            <div class="sslmanager_dialog_q_text">
            <div>Here are three different scatter plots. Match the correlation plots (ellipse plots) that identify scatter plots.</div>
            <div>
              <table style="font-size:13px;">
                <tr>
                  <td><img width="200" height="150" src="/public/images/parcoord/exp-intro/scatter-ellipse-sc-2.png"/></td>
                  <td><img width="200" height="150" src="/public/images/parcoord/exp-intro/scatter-ellipse-sc-1.png"/></td>
                  <td><img width="200" height="150" src="/public/images/parcoord/exp-intro/scatter-ellipse-sc-3.png"/></td>
                 </tr>
                <tr>
                  <td style="text-align: center">SC1</td>
                  <td style="text-align: center">SC2</td>
                  <td style="text-align: center">SC3</td>
                </tr>
                <tr>
                  <td><img width="200" height="150" src="/public/images/parcoord/exp-intro/scatter-ellipse-ell-3.png"/></td>
                  <td><img width="200" height="150" src="/public/images/parcoord/exp-intro/scatter-ellipse-ell-2.png"/></td>
                  <td><img width="200" height="150" src="/public/images/parcoord/exp-intro/scatter-ellipse-ell-1.png"/></td>
                </tr>
                <tr>
                  <td style="text-align: center">EP1</td>
                  <td style="text-align: center">EP2</td>
                  <td style="text-align: center">EP3</td>
                </tr>
              </table>
            </div>
            </div>
            <div class="sslmanager_dialog_q_choices single_answer">
              <div class="sslmanager_dialog_q_choice"><label><input class="sslmanager_dialog_cb" type="checkbox" value="0" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>SC1-EP1,SC2-EP2,SC3-EP3</label></div>
              <div class="sslmanager_dialog_q_choice"><label><input class="sslmanager_dialog_cb" type="checkbox" value="0" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>SC1-EP3,SC3-EP1,SC2-EP2</label></div>
              <div class="sslmanager_dialog_q_choice"><label><input class="sslmanager_dialog_cb" type="checkbox" value="0" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>SC1-EP1,SC2-EP3,SC3-EP2</label></div>
              <div class="sslmanager_dialog_q_choice"><label><input class="sslmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>SC1-EP2,SC2-EP3,SC3-EP1</label></div>
              </div>
          </div>
`;

  this.q5 = `
  <div class="sslmanager_dialog_q">
            <div class="sslmanager_dialog_q_text">
            <div>Here is a parallel coordinates visualization for the mathematical functions. Choose the answer that lists the functions that are positively correlated with f(x)=x.
            </div>
            <img width="400" height="200" src="/public/images/parcoord/exp-intro/wikipedia-parcoord.png"/>
            </div>
            <div class="sslmanager_dialog_q_choices multiple_answer">
             
             
             <div class="sslmanager_dialog_q_choice">
                <label><input class="sslmanager_dialog_cb" type="checkbox" value="0" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                  f(x)=random
                </label>
              </div>
              
              
              <div class="sslmanager_dialog_q_choice">
                <label><input class="sslmanager_dialog_cb" type="checkbox" value="0" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                  f(x)=-x
                </label>
              </div>
              
              <div class="sslmanager_dialog_q_choice">
                <label><input class="sslmanager_dialog_cb" type="checkbox" value="0" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                  f(x)=x^
                </label>
              </div>
              
              <div class="sslmanager_dialog_q_choice">
                <label><input class="sslmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                  f(x)=ax
                </label>
              </div>
              
              <div class="sslmanager_dialog_q_choice">
                <label><input class="sslmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                  f(x)=x+b
                </label>
              </div>
              
              
              <div class="sslmanager_dialog_q_choice">
                <label><input class="sslmanager_dialog_cb" type="checkbox" value="0" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>
                  f(x)=1/x
                </label>
              </div>
              
              
            </div>
          </div>
          
`;

    this.template=`
      <div class="sslmanager_dialog" title="Survey">
        <div class="sslmanager_dialog_container">
          
          <div class="sslmanager_dialog_q">
            <div class="sslmanager_dialog_q_text">Have you performed an statistical analysis before?</div>
            <div class="sslmanager_dialog_q_choices single_answer">
              <div class="sslmanager_dialog_q_choice"><label><input class="sslmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>Yes</label></div>
              <div class="sslmanager_dialog_q_choice"><label><input class="sslmanager_dialog_cb" type="checkbox" value="0" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>No</label></div>
            </div>
          </div>
          
          
          <div class="sslmanager_dialog_q">
            <div class="sslmanager_dialog_q_text">Do you know what the multivariate analysis is?</div>
            <div class="sslmanager_dialog_q_choices single_answer">
              <div class="sslmanager_dialog_q_choice"><label><input class="sslmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>Yes</label></div>
              <div class="sslmanager_dialog_q_choice"><label><input class="sslmanager_dialog_cb" type="checkbox" value="0" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>No</label></div>
            </div>
          </div>
          
          
         
          
          
           
          <div class="sslmanager_dialog_q">
            <div class="sslmanager_dialog_q_text">Here are three different scatter plots. Match the correlation plots (ellipse plots) that identify scatter plots.
</div>
            <div class="sslmanager_dialog_q_choices single_answer">
              <div class="sslmanager_dialog_q_choice"><label><input class="sslmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>Yes</label></div>
              <div class="sslmanager_dialog_q_choice"><label><input class="sslmanager_dialog_cb" type="checkbox" value="0" onchange="experiment.surveyShortListManager.cbOnChange(this)"/>No</label></div>
            </div>
          </div>
          
       
 
          ${this.q3}
          ${this.q4}
          ${this.q5}
          
        </div>
      </div>
      
 `;





  this.initDialog = function() {
    $(".sslmanager_dialog").dialog("destroy");
    $(".sslmanager_dialog").remove();

    $("body").append(this.template);
    $(".sslmanager_dialog").dialog({
      autoOpen:false,
      resizable:false,
      modal:true,
      buttons:{
        "OK":function(){
          var sum=0;
          $(".sslmanager_dialog_cb").each((idx, item)=>{

            if ($(item).prop("checked")) {
              var a = parseInt($(item).attr("value"));
              sum = sum + (+a);
            }
          });

          console.log("your score:", sum);

          if (sum>50) {
            alert("You passed the eligibility test! Congratulations!");
            $(this).dialog("close");
          }
        }
      }


    });



    $(".sslmanager_dialog").parent().css({
      "width":"100%",
      "height":"100%",
      "left":'0px',
      "top":'0px'
    });
    $(".sslmanager_dialog").dialog("open");


  };

  this.initQuestionMultipleAnswered = function(q){
      //do nothing it is already checkboxes.
  };


  this.cbOnChange=function(this_){

    var t = $(this_);
    var q = t.parent().parent().parent().parent();
    var singleAnswered = q.find(".sslmanager_dialog_q_choices").hasClass("single_answer");
    if (singleAnswered) {
      console.log("cbOnChange.singleAnswered:",singleAnswered);
      var choices = t.parent().parent().parent();
      var chkbx = $(choices).children().each((idx, choice)=>{
        var cb = $(choice).find("label").find("input")[0];

        $(cb).prop("checked", false);

        console.log("cb",cb);
      });

      t.prop("checked", true);
    }


  };

  this.initQuestionSingleAnswered = function(q){
    //console.log("single answered", q , q.find(".sslmanager_dialog_q_choices").find(":checkbox"));
    q.find(".sslmanager_dialog_q_choices").find(":checkbox").each((idx, item)=>{
      console.log("each.item:", item);
      $(item).change(function() {
          console.log("checked");
          //var qu_ = $(this).parent().parent().parent();
          q.find(":checkbox").attr("checked", false);
          $(this).attr("checked", true);
        });
    });
  };

  this.initCheckBoxes = function(){
    $(".sslmanager_dialog_q").each((idx,item)=>{
      console.log("q->",item);
        if ($(item).hasClass("multiple_answer"))
          this.initQuestionMultipleAnswered($(item));
        else
          this.initQuestionSingleAnswered($(item));
    });

  };

  this.initQuestions = function () {
    this.initCheckBoxes();
  };

  this.init = function(){
    this.initDialog();


    $(window).resize(function () {
      $(".sslmanager_dialog").parent().css({
        "width":"100%",
        "height":"100%",
        "left":'0px',
        "top":'0px'
      });
    }).resize(); //<---- resizes on page ready



  };




  this.init();
  this.initQuestions();
};



