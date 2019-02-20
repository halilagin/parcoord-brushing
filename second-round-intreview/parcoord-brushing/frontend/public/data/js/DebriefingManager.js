/**
 * Created by halil on 05/10/2017.
 */


var DebriefingManager=function (conf){

  this.checkeds=[];//save for future works. it is saved user actions.


  this.q1 =
    {
      tasks:["task1", "task2", "task3"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">How easy to do brushing on ellipse plotting (on both ellipse and sigma slider)?</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Normal
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Hard
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very hard
                </label>
              </div>
              
            </div>
          </div>
          `
    };

  this.q2 =
    {
      tasks:["task1","task2"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does brushing on ellipse plotting help you get relations between variables?
</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
            </div>
          </div>
          `
    };


  this.q3 =
    {
      tasks:["task1","task2", "task3"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does ellipse plotting help you order the axes according to correlation coefficient?
</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
            </div>
          </div>
          `
    };


  this.q4 =
    {
      tasks:["task1","task2","task3","task4","task5"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does ordering by observing ellipses speed up your exploratory analysis? </div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
            </div>
          </div>
          `
    };



  this.q5 =
    {
      tasks:["task1","task2","task3","task4", "task5"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Would you like to use this new brushing based on ellipses in other data sets?</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
            </div>
          </div>
          `
    };





  this.q6 =
    {
      tasks:["task1","task2"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Which image is more memorable for you?</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  The Mu and sigma position in the ellipse plotting
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  The brush position on an axis

                </label>
              </div>
              
              
              
            </div>
          </div>
          `
    };





  this.q8 =
    {
      tasks:["task1","task2", "task3"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Which brushing technique is more informative?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  The Mu and sigma position in the ellipse diagram
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  The brush position on the axis

                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                The shape of ellipse
                </label>
              </div>
              
            </div>
          </div>
          `
    };

  this.q9 =
    {
      tasks:["task1","task3","task4","task5"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does swapping & observing ellipses help you identify pairs that are mostly correlated?</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
            </div>
          </div>
          `
    };





  this.q11 =
    {
      tasks:["task5"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">How easy was determining the important features by ellipse plotting?</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Normal
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Hard
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very hard
                </label>
              </div>
              
            </div>
          </div>
          `
    };






  this.q12 =
    {
      tasks:["task5"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does swapping & observing ellipses help identify important features?</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
            </div>
          </div>
          `
    };




  this.q13 =
    {
      tasks:["task6"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">How easy was identifying the outliers by radial brushing?</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Normal
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Hard
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very hard
                </label>
              </div>
              
            </div>
          </div>
          `
    };





  this.q14 =
    {
      tasks:["task6"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does radial brushing help you order the axes?</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
            </div>
          </div>
          `
    };



  this.q15 =
    {
      tasks:["task6"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does classical brushing help you order the axes?</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
            </div>
          </div>
          `
    };




  this.q16 =
    {
      tasks:["task6"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does radial brushing speed up your exploratory analysis?</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
            </div>
          </div>
          `
    };



  this.q17 =
    {
      tasks:["task6"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Would you like to use radial brushing in other data sets?</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
            </div>
          </div>
          `
    };




  this.q18 =
    {
      tasks:["task6"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Which image is more memorable for you?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
         
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  The brush position on the axis

                </label>
              </div>
              
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  The brush position on the radial arc.

                </label>
              </div>
              
              
            </div>
          </div>
          `
    };


  this.q19 =
    {
      tasks:["task7"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">How easy was determining the relation between clusters in circular brushing diagram and the target class?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
             <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Normal
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Hard
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very hard
                </label>
              </div>
              
              
            </div>
          </div>
          `
    };



  this.q20 =
    {
      tasks:["task7"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does circular brushing help determine the relation between clusters and the target class?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
         
              
            <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
              
            </div>
          </div>
          `
    };




  this.q21 =
    {
      tasks:["task7"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does cluster brushing speed up help determine the relation between clusters and the target class?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
         
              
            <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
              
            </div>
          </div>
          `
    };




  this.q22 =
    {
      tasks:["task7"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Would you like to use cluster brushing in other data sets?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
         
              
            <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
              
            </div>
          </div>
          `
    };



  this.q23 =
    {
      tasks:["task6"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Which image is more memorable for you?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
         
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  The brush position on the axis

                </label>
              </div>
              
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  The brush position on the circular brushing panel


                </label>
              </div>
              
              
            </div>
          </div>
          `
    };



  this.q24 =
    {
      tasks:["task8"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">How easy was running the ordering algorithm?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
         
              
               <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Normal
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Hard
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very hard
                </label>
              </div>
              
              
            </div>
          </div>
          `
    };




  this.q25 =
    {
      tasks:["task8"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does ordering algorithm’s result help you get insight from the data?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
         
              
            <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
              
            </div>
          </div>
          `
    };




  this.q26 =
    {
      tasks:["task8","task9"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does ordering algorithm’s result speed up your exploratory analysis?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
         
              
            <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
              
            </div>
          </div>
          `
    };



  this.q27 =
    {
      tasks:["task8", "task9"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Would you like to use the ordering algorithm in other data sets?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
         
              
            <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
              
            </div>
          </div>
          `
    };




  this.q28 =
    {
      tasks:["task8","task9"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Which image is more memorable for you?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
         
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Ordered axes that are obtained by the algorithm

                </label>
              </div>
              
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Ordered axes that are obtained by manual ordering (swapping axes)


                </label>
              </div>
              
              
            </div>
          </div>
          `
    };




  this.q29 =
    {
      tasks:["task8"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">1.	How easy was determining the important features after running ordering algorithm?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
         
              
               <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Normal
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Hard
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very hard
                </label>
              </div>
              
              
            </div>
          </div>
          `
    };





  this.q30 =
    {
      tasks:["task8"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does the ordering algorithm help order the axes?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
         
              
            <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
              
            </div>
          </div>
          `
    };



  this.q31 =
    {
      tasks:["task8"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">Does the ordering algorithm help select features?</div>
            <div class="debrmanager_dialog_q_choices multiple_answer">
              
         
              
            <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Yes
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  No
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Not sure
                </label>
              </div>
              
              
            </div>
          </div>
          `
    };


  this.q32 =
    {
      tasks:["task1"],
      template:`
          <div class="debrmanager_dialog_q">
            <div class="debrmanager_dialog_q_text">How easy to do brushing on ellipse plotting?</div>
            <div class="debrmanager_dialog_q_choices single_answer">
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Easy
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Normal
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Hard
                </label>
              </div>
              
              <div class="debrmanager_dialog_q_choice">
                <label>
                  <input class="debrmanager_dialog_cb" type="checkbox" value="10" onchange="experiment.debriefingManager.cbOnChange(this)"/>
                  Very hard
                </label>
              </div>
              
            </div>
          </div>
          `
    };


  this.qs = [
    this.q1,this.q2,this.q3,this.q4,this.q5,this.q6,/*this.q7,*/ this.q8, this.q9, /*this.q10,*/
    this.q11,this.q12,this.q13,this.q14,this.q15,this.q16,this.q17, this.q18, this.q19, this.q20,
    this.q21,this.q22,this.q23,this.q24,this.q25,this.q26,this.q27, this.q28, this.q29, this.q30,
    this.q31
];




  this.produceQuestionsHTML = function(conf){
    console.log("conf:",conf);
    var tasks = conf["tasks"];

    var html = "";

    tasks.forEach((task)=>{

      this.qs.forEach((q)=>{

        q.tasks.forEach((qtask)=>{
          console.log("qtask");
          if (qtask==task){
            html+=q.template;
          }
        });

      });
    });

    return html;

  };



  this.initDialog = function(conf) {
    var checkeds__ = this.checkeds;
    $(".debrmanager_dialog").dialog("destroy");
    $(".debrmanager_dialog").remove();


    var html = this.produceQuestionsHTML(conf);

    var template = `<div class="debrmanager_dialog" title="Survey">
      <div class="debrmanager_dialog_container">
        ${html}
      </div>
    </div>`;

    $("body").append(template);
    $(".debrmanager_dialog").dialog({
      autoOpen:false,
      resizable:false,
      modal:true,
      width:"600px",
      buttons:{
        "OK":function(){
          checkeds__.push($(".debrmanager_dialog_container").html());
          console.log("checkeds:", checkeds__);
          console.log("shortlist.checkeds:", experiment.surveyShortListManager.checkeds);


          var postedData = {
            "shortListTest":experiment.surveyShortListManager.checkeds,
            "actions":experiment.actions,
            "debriefing":checkeds__
          };

          $.post(remoteUrls.userintsSave, JSON.stringify({"testName":"mocktest004","userName":"halil-test2", "personName":"halil-test2","data":postedData}), (data)=>{
            console.log("user actions saved!");
            alert("Experiment is finished! Thank you for your participation.");
            $(this).dialog("close");
          });



        }
      }


    });



    $(".debrmanager_dialog").parent().css({
      "width":"100%",
      "height":"100%",
      "left":'0px',
      "top":'0px'
    });


  };

  this.initQuestionMultipleAnswered = function(q){
      //do nothing it is already checkboxes.
  };


  this.cbOnChange=function(this_){

    var t = $(this_);
    var q = t.parent().parent().parent().parent();
    var singleAnswered = q.find(".debrmanager_dialog_q_choices").hasClass("single_answer");
    if (singleAnswered) {
      var choices = t.parent().parent().parent();
      var chkbx = $(choices).children().each((idx, choice)=>{
        var cb = $(choice).find("label").find("input")[0];

        $(cb).prop("checked", false);
        $(cb).removeClass("checked");
      });

      t.prop("checked", true);
    }

    if (t.prop("checked"))
      $(t).addClass("checked");
    else
      $(t).removeClass("checked");


  };

  this.initQuestionSingleAnswered = function(q){
    //console.log("single answered", q , q.find(".debrmanager_dialog_q_choices").find(":checkbox"));
    q.find(".debrmanager_dialog_q_choices").find(":checkbox").each((idx, item)=>{
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
    $(".debrmanager_dialog_q").each((idx,item)=>{
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

  this.init = function(conf_){
    this.initDialog(conf_);


    $(window).resize(function () {
      $(".debrmanager_dialog").parent().css({
        "width":"100%",
        "height":"100%",
        "left":'0px',
        "top":'0px'
      });
    }).resize(); //<---- resizes on page ready



  };




  this.init(conf);
  this.initQuestions();
};



