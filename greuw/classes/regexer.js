
function Regexer(input, expression)  {
    this.input = input;
    this.expression = expression;

    this.testIn = function() {
        if this.expression.test(this.input)
        return this.expression.test(this.input)
    }
}

module.exports = Regexer;