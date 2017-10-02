describe("dataservice", function () {

    it("should call $.get", function () {

        let fakeData = new Promise((resolve, reject) => {
            resolve({ result: "any song" })
        });

        spyOn($, "get")
            .and
            .returnValue(fakeData)

        dataservice.getByName(jasmine.anything());

        expect($.get).toHaveBeenCalled();
    });
})