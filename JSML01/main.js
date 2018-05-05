//1 5 9 0 2 4 7 6 3 4 5 1 target gene

const size = 100;
const mutation_rate = 0.01;
var population = [];
var target = [1,5,9,0,2,4,7,6,3,4,5,1];

function crossover() {
	var pool = [];
	var new_population = [];
	for(var i = 0;i < size;i++) {
		for(var j = 0;j < population[i].fitness();j++) {
			pool.push(population[i]);
		}
	}

	for(var i = 0;i < size;i++) {
		var gene1 = pool[Math.floor(Math.random() * pool.length)];
		var gene2 = pool[Math.floor(Math.random() * pool.length)];
		var offspring = [];
		for(var j =0;j < 12;j++) {
			if(Math.random() < 0.5) {
				offspring[j] = gene1.gene[j];
			}else{
				offspring[j] = gene2.gene[j];
			}
		}
		new_population.push(new gene(offspring));
	}
	population = new_population;

}

function best() {
	var score = -1;
	var gene;
	for(var i = 0;i < size;i++) {
		if(population[i].fitness() > score) {
			gene = population[i];
		}
	}
	return gene;
}

function mutation() {
	for(var i = 0;i < size;i++) {
		for(var j = 0;j < 12;j++) {
			if(Math.random() < mutation_rate) {
				population[i].gene[j] = Math.floor(Math.random() * 10);
			}
		}
	}
}

function generate() {
	for(var i = 0;i < size;i++) {
		var tmp = [];
		for(var j = 0;j < 12;j++) {
			tmp.push(Math.floor(Math.random() * 10));
		}
		population.push(new gene(tmp));
	}
}

function gene(array) {
	this.gene = array;
}

gene.prototype.fitness = function() {
	var fitness = 0;
	for(var i = 0;i < 12;i++) {
		if(this.gene[i] == target[i]) {
			fitness += 1;
		}
	}
	return fitness;
}