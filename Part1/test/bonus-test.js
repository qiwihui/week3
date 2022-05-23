// [bonus] unit test for bonus.circom

const chai = require("chai");
const path = require("path");

const wasm_tester = require("circom_tester").wasm;

const F1Field = require("ffjavascript").F1Field;
const Scalar = require("ffjavascript").Scalar;
exports.p = Scalar.fromString("21888242871839275222246405745257275088548364400416034343698204186575808495617");
const Fr = new F1Field(exports.p);

const assert = chai.assert;

describe("Bonus", function () {
    this.timeout(100000000);

    it("less", async () => {
        const circuit = await wasm_tester("contracts/circuits/bonus.circom");
        await circuit.loadConstraints();

        const INPUT = {
            "guess": 45,
            "result": 0,
            "pubSolnHash": "21634111348039949109584903447651192074762514309503629898631724114276135405226",
            "soln": 75,
            "privSalt": 12345678987654321
        }

        const witness = await circuit.calculateWitness(INPUT, true);

        console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(1)));
    });

    it("greater", async () => {
        const circuit = await wasm_tester("contracts/circuits/bonus.circom");
        await circuit.loadConstraints();

        const INPUT = {
            "guess": 80,
            "result": 1,
            "pubSolnHash": "21634111348039949109584903447651192074762514309503629898631724114276135405226",
            "soln": 75,
            "privSalt": 12345678987654321
        }

        const witness = await circuit.calculateWitness(INPUT, true);

        console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(1)));
    });

    it("equal", async () => {
        const circuit = await wasm_tester("contracts/circuits/bonus.circom");
        await circuit.loadConstraints();

        const INPUT = {
            "guess": 75,
            "result": 2,
            "pubSolnHash": "21634111348039949109584903447651192074762514309503629898631724114276135405226",
            "soln": 75,
            "privSalt": 12345678987654321
        }

        const witness = await circuit.calculateWitness(INPUT, true);

        console.log(witness);

        assert(Fr.eq(Fr.e(witness[0]),Fr.e(1)));
        assert(Fr.eq(Fr.e(witness[1]),Fr.e(1)));
    });
});
