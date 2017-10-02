describe("layout provider",function(){

    beforeEach(function(){
        let someHtml = "<a></a>"
    })

    it("should call html method on jqueryObject when its truthy", function(){
        let $container = $();
        spyOn($container, "html");
        layoutProvider.partialLayout($container,this.someHtml);

        expect($container.html).toHaveBeenCalledWith(this.someHtml);
    })

    it("should throw exception when jqueryObject is falsy", function(){
        let $container = undefined;
        
        expect(() =>layoutProvider.partialLayout($container,this.someHtml))
            .toThrow("provided jQuery element was undefined");
    })
});