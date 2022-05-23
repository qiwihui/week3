// [bonus] implement an example game from part d

pragma circom 2.0.0;


include "../../node_modules/circomlib/circuits/comparators.circom";
include "../../node_modules/circomlib/circuits/bitify.circom";
include "../../node_modules/circomlib/circuits/poseidon.circom";

template RangeProof(n) {
    assert(n <= 252);
    signal input in; // this is the number to be proved inside the range
    signal input range[2]; // the two elements should be the range, i.e. [lower bound, upper bound]
    signal output out;

    component low = LessEqThan(n);
    component high = GreaterEqThan(n);

    // [assignment] insert your code here
    low.in[0] <== in;
    low.in[1] <== range[1];

    high.in[0] <== in;
    high.in[1] <== range[0];

    out <== low. out * high. out;
}


template ZKGuessGame() {
    // Public inputs
    signal input guess;
    signal input result; // 0 = less 1 = greater 2 = equal
    signal input pubSolnHash;

    // Private inputs
    signal input soln;
    signal input privSalt;

    // Output
    signal output solnHashOut;

    // check number between 1 and 100
    component rangeProof[2];
    rangeProof[0] = RangeProof(8);
    rangeProof[0].in <== guess;
    rangeProof[0].range[0] <== 1;
    rangeProof[0].range[1] <== 100;
    rangeProof[0].out === 1;

    rangeProof[1] = rangeProof(8);
    rangeProof[1].in <== soln;
    rangeProof[1].range[0] <== 1;
    rangeProof[1].range[1] <== 100;
    rangeProof[1].out === 1;

    // count result
    var res = 2;
    if (guess < soln) {
        res = 0;
    } else if (guess > soln) {
        res = 1;
    }

    // Create a constraint around the result
    component equalResult = IsEqual();
    equalResult.in[0] <== res;
    equalResult.in[1] <== result;
    equalResult.out === 1;

    // Verify that the hash of the private solution matches pubSolnHash
    component poseidon = Poseidon(4);
    poseidon.inputs[0] <== privSalt;
    poseidon.inputs[1] <== guess;

    solnHashOut <== poseidon.out;
    pubSolnHash === solnHashOut;
}

component main {public [guess, result, pubSolnHash]} = MastermindVariation();
