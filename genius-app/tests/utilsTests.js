describe("isAlbum", function () {

    describe("with falsy data", function () {

        it("should return false", function () {
            let result = utils.isAlbum();
            expect(result).toBe(false);
        });
    });

    describe("with truthy data", function () {

        it("should return true if full_title contains tracklist", function () {
            let data = {
                result: {
                    "full_title": "some tracklist"
                }
            };

            let result = utils.isAlbum(data);
            expect(result).toBe(true);
        });

        it("should return false if full_title doesn't contains tracklist", function () {
            let data = {
                result: {
                    "full_title": "some song"
                }
            };

            let result = utils.isAlbum(data);
            expect(result).toBe(false);
        });

        it("should return false if data doesn't contain result", function () {
            let data = {};

            let result = utils.isAlbum(data);
            expect(result).toBe(false);
        });

    })
})

describe("numberWithLetter", function () {

    describe("with valid positive number should", function(){
        it("return number fixed to 1 appended with G if it's more than a billion", function () {
            let num = 1000000000;
            let res = utils.numberWithLetter(num);
            expect(res).toEqual("1G");
        })
    
        it("return number fixed to 1 appended with M if it's more than a million", function () {
            let num = 1000000;
            let res = utils.numberWithLetter(num);
            expect(res).toEqual("1M");
        })
    
        it("return number fixed to 1 appended with K if it's more than a thousand", function () {
            let num = 1000;
            let res = utils.numberWithLetter(num);
            expect(res).toEqual("1K");
        })

        it("return number if it's negative or less than thousand ", function () {
            let num = 999;
            let res = utils.numberWithLetter(num);
            expect(res).toEqual(num);
        })
    })
    
    describe("with non number type should", function(){

        it("return the object", function () {
            let num = {};
            let res = utils.numberWithLetter(num);
            expect(res).toEqual({});
        })
    })
});