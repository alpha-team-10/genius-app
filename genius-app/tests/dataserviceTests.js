describe("dataservice", function () {

    it("getByName should call $.ajax", function () {

        let fakeData = new Promise((resolve, reject) => {
            resolve({ result: "any song" })
        });

        spyOn($, "ajax")
            .and
            .returnValue(fakeData)

        dataservice.getByName(jasmine.anything());

        expect($.ajax).toHaveBeenCalled();
    });

    it("getSongById shuold call $.ajax", function() {
        let fakeData = new Promise((resolve, reject) => {
            resolve({ result: "any id" })
        });

        spyOn($, "ajax")
        .and
        .returnValue(fakeData)

        dataservice.getSongById(jasmine.anything());

        expect($.ajax).toHaveBeenCalled();
    });

    it("getHTML shuold call $.get", function() {
        let fakeData = new Promise((resolve, reject) => {
            resolve({ result: "any url" })
        });

        spyOn($, "get")
        .and
        .returnValue(fakeData)

        dataservice.getHTML(jasmine.anything());

        expect($.get).toHaveBeenCalled();
    });
})