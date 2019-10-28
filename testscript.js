import http from "k6/http";
import { check, sleep } from "k6";
import { Counter } from "k6/metrics";

let ErrorCount = new Counter("errors");
export const options = {
	vus:10,
	duration:"5s",
	threshholds: {
		errors: ["rate<5"]
	}
};

export default function() {

	const path = Math.random() < 0.9 ? "200" : "500";
	let res = http.get('https://restapi.demoqa.com/utilities/cityPune');
	let success = check(res, {
		"status is 200": r => r.status = 200
	});
  	console.log(success);
	if (!success) {
		ErrorCount.add(1);
	}
  	sleep(2);
};