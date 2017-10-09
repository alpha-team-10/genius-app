describe("dataservice", function () {

    it("should call $.get", function () {

        let fakeData = new Promise((resolve, reject) => {
            resolve({ result: "any song" })
        });

        spyOn($, "ajax")
            .and
            .returnValue(fakeData)

        dataservice.getByName(jasmine.anything());

        expect($.ajax).toHaveBeenCalled();
    });
})