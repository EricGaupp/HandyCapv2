const calculateHandicapIndex = scores => {
	//Get 20 most recent scores
	let handicapScores = [];
	if (scores.length > 20) {
		handicapScores = scores.slice(0, 20);
	} else {
		handicapScores = [...scores];
	}

	//Extract differentials from scores object
	const differentials = handicapScores.map(score => score.differential);
	//Default to lowest 10 differentials
	let arrayIndex = null;
	//Sort differentials into ascending order
	const sortedDifferentials = differentials.sort((a, b) => a - b);

	//Determing number of differentials to average
	if (sortedDifferentials.length > 19) {
		arrayIndex = 10;
	} else if (sortedDifferentials.length === 19) {
		arrayIndex = 9;
	} else if (sortedDifferentials.length === 18) {
		arrayIndex = 8;
	} else if (sortedDifferentials.length === 17) {
		arrayIndex = 7;
	} else if (
		14 < sortedDifferentials.length &&
		sortedDifferentials.length < 17
	) {
		arrayIndex = 6;
	} else if (
		12 < sortedDifferentials.length &&
		sortedDifferentials.length < 15
	) {
		arrayIndex = 5;
	} else if (
		10 < sortedDifferentials.length &&
		sortedDifferentials.length < 13
	) {
		arrayIndex = 4;
	} else if (
		8 < sortedDifferentials.length &&
		sortedDifferentials.length < 11
	) {
		arrayIndex = 3;
	} else if (
		6 < sortedDifferentials.length &&
		sortedDifferentials.length < 9
	) {
		arrayIndex = 2;
	} else if (
		4 < sortedDifferentials.length &&
		sortedDifferentials.length < 7
	) {
		arrayIndex = 1;
	}

	//Average the appropriate number of differentials
	if (arrayIndex && sortedDifferentials.length > 0) {
		const minimums = sortedDifferentials.slice(0, arrayIndex);
		let handicapIndex =
			minimums.reduce((diff, next) => {
				return diff + next;
			}, 0) / minimums.length;
		//Handicap = average of differentials multiplied by 0.96
		handicapIndex = (handicapIndex * 0.96).toFixed(3).split(".");
		handicapIndex = parseFloat(
			`${handicapIndex[0]}.${handicapIndex[1][0]}`
		);
		return handicapIndex;
	} else {
		return null;
	}
};

export default calculateHandicapIndex;
