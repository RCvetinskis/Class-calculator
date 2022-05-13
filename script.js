"use strict"
//Kintamieji
var numberButtons = document.querySelectorAll("[data-number]")
var operationsButtons = document.querySelectorAll("[data-operator]")

var equalsButton = document.querySelector("[data-equals]")
var deleteButton = document.querySelector("[data-delete]")
var allClearButton = document.querySelector("[data-all-clear]")
var previousTextElement = document.querySelector("[data-previous-opperand]")
var currentTextElement = document.querySelector("[data-currenct-opperand]")
var result = false


class Calculator {
    constructor(previousTextElement, currentTextElement){
        this.currentTextElement = currentTextElement
        this.previousTextElement = previousTextElement
        this.clear()
    }
  //Paruosia darbui objekta skaiciu ir simboliu parametrus
  clear(){
      this.currentOpperand = "" 
      this.previousOpperand = ""
      this.operation = undefined
  }
  //istrina po viena
  delete(){
 
      this.currentOpperand = this.currentOpperand.slice(0, -1)
  }

  appendNumber(number){
      // salyga neleis daugiau nei vieno tasko prideti
      if(number === "." && this.currentOpperand.includes(".")) return
      if(result && number && number !== "." && number != 0 ){
          this.currentOpperand = ""
          result= false
      } else if (result && number == ".")  {
              this.currentOpperand= "0"
      }else if (result && number == "0" && !this.currentOpperand.includes("0")){
          this.currentOpperand =""
          result = false
      } else if(this.currentOpperand.includes("0") && !this.currentOpperand.includes("0")){
          this.currentOpperand = ""
      }
      this.currentOpperand += number
  }

  updateDisplay(){
      this.currentTextElement.innerText = this.currentOpperand
      if(this.operation !== undefined){
        this.previousTextElement.innerText = 
        `${this.previousOpperand} ${this.operation}`
      } else {
          this.previousTextElement.innerText = ""
      }

  }

  chooseOperation(operation){
      if(this.currentOpperand == "") return
      if(this.previousOpperand!== ""){
          this.compute()
      }
      this.operation = operation
      this.previousOpperand = this.currentOpperand
      this.currentOpperand = ""
  }
  //skaiciavimas
  compute(){
      var computation
      var current = parseFloat(this.currentOpperand)
      var prev = parseFloat(this.previousOpperand)
       if(isNaN(current) || isNaN(prev)) return

      switch(this.operation){
          case "+": computation = prev + current;
          break;
          case "-": computation = prev - current;
          break;
          case "*": computation = prev * current;
          break;
          case "÷": computation = prev / current;
          break;
          default:return;
      }
      this.currentOpperand = computation.toString()
      this.previousOpperand = ""
      this.operation = undefined
     
  }
}
//sukura skaiciatuvo objekta atmentyje

var calculator = new Calculator(previousTextElement,currentTextElement)



numberButtons.forEach(x =>{
    x.addEventListener("click", function(){
        calculator.appendNumber(this.innerText)
        calculator.updateDisplay()
      
    })
})

operationsButtons.forEach(x => {
    x.addEventListener("click", function(){
       calculator.chooseOperation(this.innerText)
       calculator.updateDisplay()
    })
})

equalsButton.addEventListener("click", function(){
    calculator.compute()
    calculator.updateDisplay()
    result= true
 })


 allClearButton.addEventListener("click", function(){
    calculator.clear()
    calculator.updateDisplay()
 })
 deleteButton.addEventListener("click", function(){
    calculator.delete()
    calculator.updateDisplay()
 })

 