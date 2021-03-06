(function () {
    'use strict';

    define(
        [
            'lodash',
            'chai',
            'config/collections/museum/searchResultFields'
        ],
        function (_, chai, searchResultFields) {
            var expect = chai.expect;

            describe('The `museum/searchResultFields` module', function () {
                it('Defines a static array', function () {
                    expect(searchResultFields).to.be.an('array');
                    expect(searchResultFields).to.have.length(8);
                });
                it('Defines the `MediaThumbnail` field', function () {
                    var mediaField = _.find(searchResultFields, { key: 'MediaThumbnail' });
                    expect(mediaField.labelText).to.equal('Image');
                    expect(mediaField.display).to.equal('cover-image');
                });
                it('Defines the `MediaSmall` field', function () {
                    var mediaField = _.find(searchResultFields, { key: 'MediaSmall' });
                    expect(mediaField.display).to.equal('cover-image');
                    expect(mediaField.tableColumn).to.equal(false);
                });
                it('Defines the `type` field', function () {
                    var typeField = _.find(searchResultFields, { key: 'type' });
                    expect(typeField.labelText).to.equal('Item Type');
                    expect(typeField.sort).to.equal(true);
                });
                it('Defines the `idno` field', function () {
                    var idnoField = _.find(searchResultFields, { key: 'idno' });
                    expect(idnoField.labelText).to.equal('Accession Number');
                    expect(idnoField.sort).to.equal(true);
                });
                it('Defines the `ItemName` field', function () {
                    var itemNameField = _.find(searchResultFields, { key: 'ItemName' });
                    expect(itemNameField.labelText).to.equal('Item Name');
                    expect(itemNameField.sort).to.equal(true);
                });
                it('Defines the `ItemDates` field', function () {
                    var datesField = _.find(searchResultFields, { key: 'ItemDates' });
                    expect(datesField.labelText).to.equal('Dates');
                    expect(datesField.sort).to.equal(true);
                });
                it('Defines the `Importance` field', function () {
                    var importanceField = _.find(searchResultFields, { key: 'Importance' });
                    expect(importanceField.labelText).to.equal('Importance');
                    expect(importanceField.sort).to.equal(true);
                });
                it('Defines the `MakersMarks` field', function () {
                    var makersMarksField = _.find(searchResultFields, { key: 'MakersMarks' });
                    expect(makersMarksField.labelText).to.equal('Makers Marks');
                });
            });
        }
    );
}());
