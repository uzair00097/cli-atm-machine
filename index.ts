#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

let myBalance = 10000;
let myPin = 112233;

console.log(
  chalk.cyan("\n \tWelcome to the ATM Machine made by Muhammad Uzair\n")
);

let pinAnswer = await inquirer.prompt([
  {
    name: "pin",
    type: "number",
    message: "Enter your pin code:",
  },
]);
if (pinAnswer.pin === myPin) {
  console.log(chalk.green("Correct pin code. Login successfully!!"));

  let operationAns = await inquirer.prompt([
    {
      name: "operation",
      type: "list",
      message: "Select any operation to perform:",
      choices: ["Withdraw Amount", "Check Balance"],
    },
  ]);

  if (operationAns.operation === "Withdraw Amount") {
    let withdrawAns = await inquirer.prompt([
      {
        name: "withdrawMethod",
        type: "list",
        message: "Select any option for withdrawal:",
        choices: ["Fast Cash", "Enter Amount"],
      },
    ]);
    if (withdrawAns.withdrawMethod === "Fast Cash") {
      let fastcashAns = await inquirer.prompt([
        {
          name: "fastCash",
          type: "list",
          message: "Select amount for withdrawal",
          choices: [1000, 3000, 5000, 7000, 10000, 20000],
        },
      ]);
      if (fastcashAns.fastCash > myBalance) {
        console.log(chalk.red("Insufficient Balance!!!"));
      } else {
        myBalance -= fastcashAns.fastCash;
        console.log(
          chalk.magenta(`${fastcashAns.fastCash} Successfully Withdrawn...`)
        );
        console.log(chalk.green(`Your remaining balance is ${myBalance}`));
      }
    } else if (withdrawAns.withdrawMethod === "Enter Amount") {
      let amountAns = await inquirer.prompt([
        {
          name: "amount",
          type: "number",
          message: "Enter amount for withdrawal:",
        },
      ]);
      if (amountAns.amount > myBalance) {
        console.log(chalk.red("Your balance is insufficient"));
      } else {
        myBalance -= amountAns.amount;
        console.log(
          chalk.bgMagenta(`${amountAns.amount} Successfully withdrawn`)
        );
        console.log(chalk.bgGray(`Your remaining balance is: ${myBalance}`));
      }
    }
  } else if (operationAns.operation === "Check Balance") {
    console.log(chalk.bgMagenta(`Your account balance is: ${myBalance}`));
  }
} else {
  console.log(chalk.red("Incorrect Pin Code..!!!"));
}
