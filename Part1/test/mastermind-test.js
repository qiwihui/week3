//[assignment] write your own unit test to show that your Mastermind variation circuit is working as expected

const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("MastermindVariation", function () {
    this.timeout(100000000);

    it("fermi", async () => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");
        await circuit.loadConstraints();

        const INPUT = {
            "pubGuessA": 1,
            "pubGuessB": 2,
            "pubGuessC": 3,
            "pubResult": 0,
            "pubSolnHash": "2763252050634862169250494721500520038643316832598771458934012243310201513979",
            "privSolnA": 1,
            "privSolnB": 2,
            "privSolnC": 3,
            "privSalt": 12345678987654321
        }

        const witness = await circuit.calculateWitness(INPUT, true);

        console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(1)));
    });

    it("pico", async () => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");
        await circuit.loadConstraints();

        const INPUT = {
            "pubGuessA": 4,
            "pubGuessB": 1,
            "pubGuessC": 6,
            "pubResult": 1,
            "pubSolnHash": "2763252050634862169250494721500520038643316832598771458934012243310201513979",
            "privSolnA": 1,
            "privSolnB": 2,
            "privSolnC": 3,
            "privSalt": 12345678987654321
        }

        const witness = await circuit.calculateWitness(INPUT, true);

        console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(1)));
    });

    it("bagels", async () => {
        const circuit = await wasm_tester("contracts/circuits/MastermindVariation.circom");
        await circuit.loadConstraints();

        const INPUT = {
            "pubGuessA": 4,
            "pubGuessB": 5,
            "pubGuessC": 6,
            "pubResult": 1,
            "pubSolnHash": "2763252050634862169250494721500520038643316832598771458934012243310201513979",
            "privSolnA": 1,
            "privSolnB": 2,
            "privSolnC": 3,
            "privSalt": 12345678987654321
        }

        const witness = await circuit.calculateWitness(INPUT, true);

        console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(1)));
    });
});