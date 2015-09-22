/*jshint browser:true*/
/*
 * Copyright (c) Codiad & Andr3as, distributed
 * as-is and without warranty under the MIT License.
 * See http://opensource.org/licenses/MIT for more information. 
 * This information must remain intact.
 */

(function(global, $){

    var codiad = global.codiad,
        scripts = document.getElementsByTagName('script'),
        path = scripts[scripts.length-1].src.split('?')[0],
        curpath = path.split('/').slice(0, -1).join('/')+'/';

    $(function() {
        codiad.CSSLint.init();
    });

    codiad.CSSLint = {

        path:     curpath,
        config:   [],
        worker:   null,

        init: function() {
            var _this = this;
            //Load lib
            this.worker = new Worker(this.path+'worker.js');
            this.worker.addEventListener('message', this.getWorkerResult.bind(this));
            //Add panel
            $('#editor-bottom-bar').before('<div class="csslint-panel"><div class="csslint-data"></div>'+
                                                '<span class="csslint-panel-close icon-cancel"></span></div>');
            $('.csslint-panel').hide();
            //Add indicator
            $('#current-file').after('<div class="divider csslint"></div><div class="csslint csslint-indicator"></div>');
            $('.csslint-indicator').click(function(){
                _this.togglePanel();
            });
            $('.csslint-panel-close').click(function(){
                _this.togglePanel();
            });
            //Click on lines
            $('.csslint-table .line-number').live('click', function(){
                _this.navigateToLine(this);
            });
            $('.csslint-table .message').live('click', function(){
                _this.navigateToLine(this);
            });
            //Register listeners
            amplify.subscribe('active.onFocus', function(path){
                path = path || codiad.active.getPath();
                if (/(\.css)$/.test(path)) {
                    $('.csslint').show();
                    setTimeout(function(){
                        _this.lint();
                    }, 10);
                    //Load config
                    var project = _this.getProject();
                    $.getJSON(_this.path + "controller.php?action=getConfig&project="+project+"&path="+path, function(json){
                        if (json.status == "success") {
                            _this.config = json.data;
                            _this.lint();
                        }
                    });
                } else {
                    _this.hide();
                }
            });
            amplify.subscribe('active.onSave', function(path){
                path = path || codiad.active.getPath();
                if (/(\.css)$/.test(path)) {
                    setTimeout(function(){
                        _this.lint();
                    }, 10);
                }
            });
            amplify.subscribe('active.onClose', function(path){
                _this.hide();
            });
            amplify.subscribe('active.onRemoveAll', function(){
                _this.hide();
            });
            amplify.subscribe('settings.dialog.tab_loaded', function(name){
                if (name == "CSSLint") {
                    _this.__applyGlobalSettings();
                }
            });
            amplify.subscribe('settings.dialog.save', function(){
                if ($('.settings-csslint').length > 0) {
                    _this.__saveGlobalSettings();
                }
            });
        },

        lint: function() {
            var options = this.getOptions();
            var code    = codiad.editor.getContent();
            this.worker.postMessage({code: code, options: options});
        },

        getWorkerResult: function(e) {
            var data    = JSON.parse(e.data.data);
            if (data.messages.length === 0) {
                $('.csslint-indicator').html('<span class="icon-check"></span>');
                $('.csslint-data').html("");
                return true;
            } else {
                $('.csslint-indicator').html('<span class="icon-attention"></span>');
            }
            var errors = [];
            var warnings = [];
            for (var i = 0; i < data.messages.length; i++) {
                if (data.messages[i].type == "warning") {
                    warnings.push(data.messages[i]);
                } else {
                    errors.push(data.messages[i]);
                }
            }
            //Parse errors and warnings
            var table   = '<table class="csslint-table">';
            if (errors.length > 0) {
                table += '<th class="title" colspan="2">Errors</th>';
            }
            for (var j = 0; j < errors.length; j++) {
                table += this.createLine(errors[j].line, errors[j].col, errors[j].message);
            }
            
            if (warnings.length > 0) {
                table += '<th class="title" colspan="2">Warnings</th>';
            }
            for (var k = 0; k < warnings.length; k++) {
                table += this.createLine(warnings[k].line, warnings[k].col, warnings[k].message);
            }
            
            table += '</table>';
            //Insert data
            $('.csslint-data').html(table);
        },

        togglePanel: function() {
            $('.csslint-panel').toggle();
            var height = parseInt($('#root-editor-wrapper').height(), 10);
            if ($('.csslint-panel:visible').length > 0) {
                $('#root-editor-wrapper').height(height - 150);
            } else {
                $('#root-editor-wrapper').height(height + 150);
            }
            codiad.editor.resize();
        },

        hide: function() {
            $('.csslint').hide();
            if ($('.csslint-panel').is(':visible')) {
                this.togglePanel();
            }
        },

        createLine: function(line, col, msg) {
            return '<tr><td class="line-number" data-line="'+line+'" data-col="'+col+'">'+
                    line+'</td><td class="message" data-line="'+line+'" data-col="'+col+'">'+msg+'</td></tr>';
        },

        navigateToLine: function(element) {
            var line = parseInt($(element).attr('data-line'), 10) - 1;
            var col = parseInt($(element).attr('data-col'), 10) - 1;
            codiad.editor.getActive().moveCursorToPosition({"row":line, "column":col});
            codiad.editor.getActive().clearSelection();
            codiad.editor.getActive().focus();
        },
        
        getOptions: function() {
            var options = this.__getOptions();
            $.each(this.config, function(i, item){
                options[i] = item;
            });
            return options;
        },

        getProject: function() {
            return $('#project-root').attr('data-path');
        },
        
        __getOptions: function() {
            var options = localStorage.getItem('codiad.plugin.csslint');
            if (options === null) {
                return {};
            } else {
                return JSON.parse(options);
            }
        },
        
        __saveGlobalSettings: function() {
            var options = {};
            $('.settings-csslint .csslint-option').each(function(i, item){
                var name = $(item).attr('name');
                if ($(item).attr("checked") == "checked") {
                    options[name] = true;
                }
            });
            localStorage.setItem('codiad.plugin.csslint', JSON.stringify(options));
        },
        
        __applyGlobalSettings: function() {
            var options = this.__getOptions();
            $('.settings-csslint .csslint-option').each(function(i, item){
                var name = $(item).attr('name');
                if (!(options[name] || false)) {
                    $(item).removeAttr('checked');
                }
            });
        }
    };
})(this, jQuery);
