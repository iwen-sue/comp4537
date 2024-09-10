class UserMessage {
    constructor(message) {
        this.message = message;
    }

}

let alertMsg = new UserMessage('Please enter a number between 3 and 7');
let errorMsg = new UserMessage('Wrong order! Please try again.');
let successMsg = new UserMessage('Excellent memory!');