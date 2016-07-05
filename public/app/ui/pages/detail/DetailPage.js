(function () {
    'use strict';

    define(
        [
            'lodash',
            'knockout',
            'util/container',
            'models/DynamicRecord'
        ],
        function (_, ko, container, DynamicRecord) {
            return function (context) {
                var settings = container.resolve('settings.' + context.params.type),
                    record = ko.observable(undefined);

                this.detailFields = ko.observableArray();

                this.data = ko.pureComputed(function () {
                    return record() ? record().data() : undefined;
                }.bind(this));

                this.idno = ko.pureComputed(function () {
                    var data = this.data();
                    return data ? data.idno : undefined;
                }.bind(this));

                this.displayRecord = ko.pureComputed(function () {
                    return !!this.data();
                }.bind(this));

                this.collectionName = ko.pureComputed(function () {
                    var data = this.data();
                    return data ? data.type : undefined;
                }.bind(this));

                this.detail = ko.pureComputed(function () {
                    return 'collections/' + context.params.type + '/detail';
                });

                this.binding = function (element, callback) {
                    var overlay = container.resolve('ui.overlay');
                    record(undefined);
                    overlay.loading(true);
                    require(
                        [
                            settings.detailFields
                        ],
                        function (detailFields) {
                            this.detailFields(detailFields);
                            container.resolve('detail.' + context.params.type)(
                                context.params.id,
                                function (err, result) {
                                    if (err) {
                                        overlay.error(err);
                                        return callback();
                                    }
                                    record(new DynamicRecord(result, this.detailFields));
                                    callback();
                                }.bind(this)
                            );
                        }.bind(this)
                    );
                };

                this.ready = function (callback) {
                    container.resolve('ui.overlay').loading(false);
                    callback();
                };

                this.labelFor = function (key) {
                    var field = _.find(this.detailFields(), { key: key });
                    return field ? field.labelText : '';
                };

                this.displayFor = function (key) {
                    var field = _.find(this.detailFields(), { key: key });
                    if (!field) {
                        return undefined;
                    }
                    return {
                        name: 'display/' + (field.display || 'text'),
                        params: {
                            data: this.data,
                            name: key,
                            placeholder: field.placeholder
                        }
                    };
                };

                this.displayForLabelField = function () {
                    return this.displayFor(settings.labelField);
                };
            };
        }
    );
}());
