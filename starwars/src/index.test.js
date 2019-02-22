const starWars = require('./index');
const starWarsNames = require('./starwars-names.json');

describe('starwars-names', () => {
  describe('all', () => {
    test('should be a fulfilled array', () => {
      expect(starWars.all).toHaveLength(starWarsNames.length)
    });
    test('should be an array of strings', () => {
      for(var i=0; i < starWarsNames.length; i++)
      {
         expect(typeof "SWNames[i]").toBe("string");
      }
     
    });

    test('should contain `Luke Skywalker`', () => {
    
      expect(starWarsNames).toEqual(expect.arrayContaining(["Luke Skywalker"]));

    });

    test('should not contain `Ben Quadinaros`', () => {
    expect(starWars.all).not.toContain("Ben Quadinaros");
    });
  });

  describe('random', () => {
    test('should return a random item from the starWars.all', () => {
       expect(starWars.all).toContain(starWars.random());
    });

    test('should return an array of random items if passed a number', () => {
      var i = Math.floor((Math.random() * starWars.length)+1);
     expect(starWars.all).toEqual(expect.arrayContaining(starWars.random(i)));     
    });
  });
});