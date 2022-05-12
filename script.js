"use strict"
//Kintamieji
var numberButtons = document.querySelectorAll("[data-number]")
var operationsButtons = document.querySelectorAll("[data-operator]")

var equalsButton = document.querySelector("[data-equals]")
var deleteButton = document.querySelector("[data-delete]")
var allClearButton = document.querySelector("[data-all-clear]")
var previousTextElement = document.querySelector("[data-previous-opperand]")
var currentTextElement = document.querySelector("[data-currenct-opperand]")


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

  appendNumber(number){
      // salyga neleis daugiau nei vieno tasko prideti
      if(number === "." && this.currentOpperand.includes(".")) return
      this.currentOpperand += number
  }

  updateDisplay(){
      this.currentTextElement.innerText = this.currentOpperand
      if(this.operation !== undefined){
        this.previousTextElement.innerText = 
        `${this.previousOpperand} ${this.operation}`
      }

  }

  chooseOperation(operation){
      if(this.currentOpperand == "") return
      this.operation = operation
      this.previousOpperand = this.currentOpperand
      this.currentOpperand = ""
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