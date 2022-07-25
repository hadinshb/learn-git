let Status, CurrentQuestion
let Questions = []


class Quiz {

    constructor(ID, Title, Answer = null) {
        this._id = ID
        this._title = Title
        this._answer = Answer
    }

    get id() { return this._id }
    set id(ourId) { this._id = ourId }

    get title() { return this._title }
    set title(ourTitle) { this._title = ourTitle }

    get type() { return this._type }
    set type(ourType) { this._type = ourType }

    get answer() { return this._answer }
    set answer(ourAnswer) { this._answer = ourAnswer }



}

class FillingQuiz extends Quiz {

    constructor(ID, Title, Answer = null) {
        super(ID, Title, Answer)
        this.type = 'Filling'
    }


}

class BooleanQuiz extends Quiz {

    constructor(ID, Title, Answer = null) {
        super(ID, Title, Answer)
        this.type = 'Boolean'
    }


}

class MultipleChoiceQuiz extends Quiz {

    constructor(ID, Title, Choice1, Choice2, Choice3, Choice4, Answer = null) {
        super(ID, Title, Answer)
        this.type = 'MultipleChoice'
        this._Choice1 = Choice1
        this._Choice2 = Choice2
        this._Choice3 = Choice3
        this._Choice4 = Choice4
    }

    get Choice1() { return this._Choice1 }
    set Choice1(ourChoice) { this._Choice1 = ourChoice }

    get Choice2() { return this._Choice2 }
    set Choice2(ourChoice) { this._Choice2 = ourChoice }

    get Choice3() { return this._Choice3 }
    set Choice3(ourChoice) { this._Choice3 = ourChoice }

    get Choice4() { return this._Choice4 }
    set Choice4(ourChoice) { this._Choice4 = ourChoice }




}





const onLoadQuiz = () => {


    Status = (localStorage.getItem('status')) ? localStorage.getItem('status') : 'idle'
    CurrentQuestion = (localStorage.getItem('CurrentQuestion')) ? localStorage.getItem('CurrentQuestion') : 0
    Questions = []
    let RawData = (localStorage.getItem('Questions')) ? JSON.parse(localStorage.getItem('Questions')) : []
    RawData.forEach(item => {


        switch (item._type) {
            case 'Filling':
                {
                    Questions.push(new FillingQuiz(item._id, item._title, item._answer))
                    break;
                }
            case 'Boolean':
                {
                    Questions.push(new BooleanQuiz(item._id, item._title, item._answer))
                    break;
                }

            case 'MultipleChoice':
                {
                    Questions.push(new MultipleChoiceQuiz(item._id, item._title, item._Choice1, item._Choice2, item._Choice3, item._Choice4, item._answer))
                    break;
                }
        }

    })










    switch (Status) {
        case 'idle':
            {
                document.getElementById('QuizFrame').innerHTML = `

                <section id="cta" class="cta"><div class="container aos-init aos-animate" data-aos="zoom-in">
                <div class="text-center"><h3>Welcome To Our Simple Quiz</h3>
                <p> To Start, Click The Button Bellow</p> 
                <a class="cta-btn scrollto" onClick="Start()">Start The Quiz</a></div></div></section>
                
                `
                break
            }
        case 'started':
            {

                let backdisplay = (CurrentQuestion == 1) ? 'none' : ''

                switch (Questions[CurrentQuestion - 1].type) {
                    case 'Filling':
                        {
                            document.getElementById('QuizFrame').innerHTML = `

                            <section id="cta" class="cta">
                            <div class="container aos-init aos-animate" data-aos="zoom-in">
                            <div class="text-center"><h3>Question ${Questions[CurrentQuestion - 1].id}</h3>
                            <p> ${Questions[CurrentQuestion - 1].title}</p> 
                            <input type="text" id="fillingAnswer"> 
                            <br>
                            <a style="display:${backdisplay};"class="cta-btn scrollto" onClick="back()">Back</a>
                            <a class="cta-btn scrollto" onClick="submitFillingQuestion()">Submit Answer</a>
                            
                            </div></div></section>
                            
                            `
                            break
                        }

                    case 'Boolean':
                        {
                            document.getElementById('QuizFrame').innerHTML = `

                            <section id="cta" class="cta">
                            <div class="container aos-init aos-animate" data-aos="zoom-in">
                            <div class="text-center"><h3>Question ${Questions[CurrentQuestion - 1].id}</h3>
                            <p> ${Questions[CurrentQuestion - 1].title}</p> 
                            <input type="radio" id="b_yes" name="True_False" >Yes</input>
                            </p>
                            <p>
                            <input type="radio" id="b_now" name="True_False">No</input>
                            </p>
                            <br>
                            <a style="display:${backdisplay};"class="cta-btn scrollto" onClick="back()">Back</a>
                            <a class="cta-btn scrollto" onClick="submitBooleanQuestion()">Submit Answer</a>
                            
                            </div></div></section>
                            
                            `
                            break

                        }
                    case 'MultipleChoice':
                        {
                            document.getElementById('QuizFrame').innerHTML = `

                            <section id="cta" class="cta">
                            <div class="container aos-init aos-animate" data-aos="zoom-in">
                            <div class="text-center"><h3>Question ${Questions[CurrentQuestion - 1].id}</h3>
                            <p> ${Questions[CurrentQuestion - 1].title}</p> 
                            <select id="multiChoice"class="form-select" aria-label="Default select example">
                            <option selected>Select...</option>
                            <option value="${Questions[CurrentQuestion - 1].Choice1}">${Questions[CurrentQuestion - 1].Choice1}</option>
                            <option value="${Questions[CurrentQuestion - 1].Choice2}">${Questions[CurrentQuestion - 1].Choice2}</option>
                            <option value="${Questions[CurrentQuestion - 1].Choice3}">${Questions[CurrentQuestion - 1].Choice3}</option>
                            <option value="${Questions[CurrentQuestion - 1].Choice4}">${Questions[CurrentQuestion - 1].Choice4}</option>
                          </select>

                            <br>
                            <a style="display:${backdisplay};"class="cta-btn scrollto" onClick="back()">Back</a>
                            <a class="cta-btn scrollto" onClick="submitMultipleQuestion()">Submit Answer</a>
                            
                            </div></div></section>
                            
                            `

                            break
                        }
                }


                break
            }
        case 'finished':
            {
                let htmlFinished = `

                <section id="cta" class="cta"><div class="container aos-init aos-animate" data-aos="zoom-in">
                <div class="text-center"><h3>Congratulation...Your Answers:</h3>
             <hr>
                <ul>
                `

                Questions.forEach(question => {

                    htmlFinished += ` 
                    
                    <li> 
                    Question ${question.id} : ${question.answer}
                    </li>
                    `

                })


                htmlFinished += `
               <ul>

                 <br>
                <p> To Answer Again, Click The Button Bellow</p> 
                <a class="cta-btn scrollto" onClick="Start()">Restart The Quiz</a></div></div></section>
                
                `
                document.getElementById('QuizFrame').innerHTML = htmlFinished
                break
            }

    }

}




const Start = () => {
    localStorage.setItem('status', 'started')
    localStorage.setItem('CurrentQuestion', 1)
    ArrayOfQuestion = []

    let quiz;
    quiz = new FillingQuiz(1, 'Where is The Capital of Iran?')
    ArrayOfQuestion.push(quiz)


    quiz = new BooleanQuiz(2, 'is (2+2=5) true? ')
    ArrayOfQuestion.push(quiz)


    quiz = new BooleanQuiz(3, 'is (3*4=12) true? ')
    ArrayOfQuestion.push(quiz)

    quiz = new MultipleChoiceQuiz(4, 'Who is Apple Company founder?', 'Steve Jobs', 'Hadi Sheikhabkloo', 'Bill Gaytes', 'Steve Rayan')
    ArrayOfQuestion.push(quiz)



    quiz = new BooleanQuiz(5, 'is (7+2=5) true? ')
    ArrayOfQuestion.push(quiz)


    quiz = new FillingQuiz(6, 'What is difference between Mobile and Tablet?')
    ArrayOfQuestion.push(quiz)

    quiz = new MultipleChoiceQuiz(7, 'What is Your Favorite Color?', 'Red', 'Blue', 'Green', 'Yellow')
    ArrayOfQuestion.push(quiz)

    quiz = new BooleanQuiz(8, 'Do you feel bad? ')
    ArrayOfQuestion.push(quiz)

    quiz = new BooleanQuiz(9, 'is Javascript courses easy ? ')
    ArrayOfQuestion.push(quiz)

    quiz = new FillingQuiz(10, 'Tell us Something... ')
    ArrayOfQuestion.push(quiz)

    // console.log(Questions)
    localStorage.setItem('Questions', JSON.stringify(ArrayOfQuestion))
    onLoadQuiz()
}





const back = () => {


    if (CurrentQuestion > 1) {
        CurrentQuestion--;
        localStorage.setItem('CurrentQuestion', CurrentQuestion)

    }
    onLoadQuiz()
}

const SubmitData = (userAnswer) => {

    Questions.forEach(item => {
        if (item.id == CurrentQuestion) {
            item.answer = userAnswer
        }

    });

    localStorage.setItem('Questions', JSON.stringify(Questions))

    CurrentQuestion++;
    if (CurrentQuestion > 10) {
        Status = 'finished'
    }

    localStorage.setItem('status', Status)
    localStorage.setItem('CurrentQuestion', CurrentQuestion)

    onLoadQuiz()

}

const submitFillingQuestion = () => {

    let userAnswer = document.getElementById('fillingAnswer').value;
    if (userAnswer) {
        SubmitData(userAnswer)
    }
    else {
        alert("Fill the Answer...")
    }
}


const submitBooleanQuestion = () => {

    let yesChoice = document.getElementById('b_yes').checked;
    let nowChoice = document.getElementById('b_now').checked;
    if (yesChoice ||nowChoice) {
        let userAnswer=(yesChoice)?'Yes':'No'
        SubmitData(userAnswer)
    }
    else {
        alert("Fill the Answer...")
    }

}

const submitMultipleQuestion = () => {

    let Choice = document.getElementById('multiChoice').value;
   
    if (Choice!='Select...' ){
       
        SubmitData(Choice)
    }
    else {
        alert("Fill the Answer...")
    }
}



const submitSingleQuestion = () => {

    let Choice = document.getElementById('multiChoice').value;
   
    if (Choice!='null' ){
       
        SubmitData(Choice)
    }
    else {
        alert("Fill the Answer...")
    }
}






