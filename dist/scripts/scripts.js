!function(self){self.JSOL||(self.JSOL={});var trim=/^(\s|\u00A0)+|(\s|\u00A0)+$/g;"function"!=typeof self.JSOL.parse&&(self.JSOL.parse=function(inText){var text=inText.replace(/\n/,"");if("string"!=typeof text||!text)return null;if(text=text.replace(trim,""),text=text.replace(/'/g,'"'),/^[\],:{}\s]*$/.test(text.replace(/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,"@").replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,"]").replace(/(?:^|:|,)(?:\s*\[)+/g,":").replace(/\w*\s*\:/g,":")))return new Function("return "+text)();throw"Invalid JSOL: "+text})}(window),angular.module("services.templateRetriever",[]).factory("templateRetriever",["$http","$q",function($http,$q){return{getTemplate:function(templateUrl,tracker){var deferred=$q.defer();return $http({url:templateUrl,method:"GET",headers:{"Content-Type":"text/html"},tracker:tracker||"promiseTracker"}).success(function(data){deferred.resolve(data)}).error(function(data,status,headers,config){deferred.reject({data:data,status:status,headers:headers,config:config})}),deferred.promise}}}]),function(){var extendCustomValidations=angular.module("directives.customvalidation.customValidationTypes",["directives.customvalidation.customValidations"]);extendCustomValidations.provider("myValidations",function(){getValidationAttributeValue=angular_ui_form_validations.getValidationAttributeValue;var outOfBoxValidations=[{customValidationAttribute:"validationFieldRequired",errorMessage:"This is a required field",validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){return/\S/.test(val)}},{customValidationAttribute:"validationConfirmPassword",errorMessage:"Passwords do not match.",validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){return!0}},{customValidationAttribute:"validationEmail",errorMessage:"Please enter a valid email",validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){return/^.*@.*\..*[a-z]$/i.test(val)}},{customValidationAttribute:"validationNoSpace",errorMessage:"Cannot contain any spaces",validateWhileEntering:!0,validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){return"undefined"!=typeof val&&""===val.trim()?!0:""!==val&&/^[^\s]+$/.test(val)}},{customValidationAttribute:"validationSetLength",errorMessage:"",validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){var customMessage=getValidationAttributeValue(rawAttr,"message",!0);return val.length===parseInt(getValidationAttributeValue(rawAttr),10)?!0:(errorMessageElement.html(customMessage||"Set number of characters allowed is "+getValidationAttributeValue(rawAttr)),!1)}},{customValidationAttribute:"validationMinLength",errorMessage:function(attr){return"Minimum of "+getValidationAttributeValue(attr)+" characters"},validator:function(errorMessageElement,val,attr){return val.length>=parseInt(getValidationAttributeValue(attr),10)}},{customValidationAttribute:"validationMaxLength",errorMessage:"",validateWhileEntering:!0,validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){var customMessage=getValidationAttributeValue(rawAttr,"message",!0);return val.length<=parseInt(getValidationAttributeValue(rawAttr),10)?!0:(errorMessageElement.html(customMessage||"Maximum of "+getValidationAttributeValue(rawAttr)+" characters"),!1)}},{customValidationAttribute:"validationOnlyAlphabets",errorMessage:"Valid characters are: A-Z, a-z",validateWhileEntering:!0,validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){return/^[a-z]*$/i.test(val)}},{customValidationAttribute:"validationOneUpperCaseLetter",errorMessage:"Must contain at least one uppercase letter",validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){return/^(?=.*[A-Z]).+$/.test(val)}},{customValidationAttribute:"validationOnlyNumbers",errorMessage:"Must contain only numbers",validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){return/^[0-9]*$/i.test(val)}},{customValidationAttribute:"validationOneNumber",errorMessage:"Must contain at least one number",validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){return/^(?=.*[0-9]).+$/.test(val)}},{customValidationAttribute:"validationOneAlphabet",errorMessage:"Must contain at least one alphabet",validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){return/^(?=.*[a-z]).+$/i.test(val)}},{customValidationAttribute:"validationNoSpecialChars",validateWhileEntering:!0,errorMessage:"Valid characters are: A-Z, a-z, 0-9",validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){return/^[a-z0-9_\-\s]*$/i.test(val)}},{customValidationAttribute:"validationDateBeforeToday",errorMessage:"Must be prior to today",validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){var now,dateValue;return now=new Date,dateValue=new Date(val),dateValue.setDate(dateValue.getDate()+1),now>dateValue}},{customValidationAttribute:"validationDateBefore",errorMessage:function(attr){return"Must be before "+getValidationAttributeValue(attr)},validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){var beforeDate=attr,dateValue=new Date(val);return dateValue.setDate(dateValue.getDate()+1),dateValue<new Date(beforeDate)}},{customValidationAttribute:"validationDateAfter",errorMessage:function(attr){return"Must be after "+getValidationAttributeValue(attr)},validator:function(errorMessageElement,val,attr,$element,model,ngModelController,$scope,rawAttr){var afterDate=attr,dateValue=new Date(val);return dateValue.setDate(dateValue.getDate()+1),dateValue.setHours(0),dateValue>new Date(afterDate)}}],userCustomValidations=[];this.addCustomValidations=function(validations){userCustomValidations=userCustomValidations.concat(validations)};var compileProvider;this.setCompileProvider=function(cp){compileProvider=cp};var Validations=function(){this.compileDirective=function(name,constructor){compileProvider.directive.apply(null,[name,constructor])},this.fetch=function(){return userCustomValidations.concat(outOfBoxValidations)}};this.$get=function(){return new Validations}}),extendCustomValidations.config(["$compileProvider","myValidationsProvider",function($compileProvider,myValidationsProvider){myValidationsProvider.setCompileProvider($compileProvider)}]),extendCustomValidations.run(["myValidations",function(myValidations){angular.forEach(myValidations.fetch(),function(customValidation){myValidations.compileDirective("input",function(customValidationUtil){return{require:"?ngModel",restrict:"E",link:customValidationUtil.createValidationLink(customValidation)}}),myValidations.compileDirective("textarea",function(customValidationUtil){return{require:"?ngModel",restrict:"E",link:customValidationUtil.createValidationLink(customValidation)}})})}])}(),angular.module("directives.invalidinputformatter.invalidInputFormatter",[]).directive("input",function(){return{require:"?ngModel",restrict:"E",link:function($scope,$element,$attrs,ngModelController){var inputType=angular.lowercase($attrs.type);ngModelController&&"radio"!==inputType&&"checkbox"!==inputType&&ngModelController.$formatters.unshift(function(value){return ngModelController.$invalid&&angular.isUndefined(value)&&"string"==typeof ngModelController.$modelValue?ngModelController.$modelValue:value})}}}),angular_ui_form_validations=function(){var customValidations,createValidationFormatterLink,customValidationsModule,getValidationPriorityIndex,getValidationAttributeValue,getValidatorByAttribute,getCustomTemplateIfDefined,customTemplates,isCurrentlyDisplayingAnErrorMessageInATemplate,currentlyDisplayedTemplate,dynamicallyDefinedValidation,$q,$timeout,$log;customTemplates=[],customValidations=[];var submitLink=function($scope,$element,$attrs,ngModelController){if("undefined"!=typeof $attrs.validationSubmit){var validationSubmit=getValidationAttributeValue($attrs.validationSubmit,"onSubmit",!0),formName=getValidationAttributeValue($attrs.validationSubmit,"formName",!0),form=angular.element("[name="+formName+"]");0===form.length&&(form=$element.parents("[name="+formName+"]")),validationSubmit=validationSubmit.substring(0,validationSubmit.indexOf("("));var submitFunction=$scope[validationSubmit],indexOfDot=validationSubmit.indexOf(".");if(-1!==indexOfDot){var model=validationSubmit.substring(0,indexOfDot),modelFunction=validationSubmit.substring(indexOfDot+1);submitFunction=$scope[model][modelFunction]}var formIsValid=!1;$element.addClass("invalid"),$element.removeClass("valid");var formIsSubmittable=function(){formIsValid=!0,$element.addClass("valid"),$element.removeClass("invalid")},formIsNotSubmittable=function(){formIsValid=!1,$element.addClass("invalid"),$element.removeClass("valid")},formValidityChangeListener=function(currentValidValue,previousValidValue){var valid=currentValidValue;valid===!0?formIsSubmittable():formIsNotSubmittable()},isFormValid=function(scope){var valid=!1,hasMissingRequiredField=!1,fields=form.children("input, select");if(fields.each(function(index,field){""===field.value.trim()&&"true"===$(field).attr("validation-field-required")&&(hasMissingRequiredField=!0)}),hasMissingRequiredField===!0)return!1;var numTotalFields=fields.length,numValidatedFields=form.children(".ValidationLiveSuccess").length;return numTotalFields-numValidatedFields===0&&(valid=!0),valid};$scope.$watch(function(scope){return isFormValid(scope)},function(valid){valid===!0?formIsSubmittable():formIsNotSubmittable()}),$element.on("click",function(){formIsValid===!0&&submitFunction.apply($scope,[])}),formValidityChangeListener(isFormValid($scope))}};return dynamicallyDefinedValidation={customValidationAttribute:"validationDynamicallyDefined",errorCount:0,latestElement:null,_errorMessage:"Field is invalid",_success:function(){},success:function(){return dynamicallyDefinedValidation._success&&dynamicallyDefinedValidation._success.apply(this,arguments)},errorMessage:function(){return dynamicallyDefinedValidation._errorMessage},validator:function(errorMessageElement,val,attr,element,model,modelCtrl,scope){var valid,hydrateDynamicallyDefinedValidation,scopeValidations,setErrorIdentifier,setValidity,validatorArgs;return validatorArgs=arguments,scopeValidations=scope[attr],hydrateDynamicallyDefinedValidation=function(validation){return dynamicallyDefinedValidation._errorMessage=validation.errorMessage,dynamicallyDefinedValidation._success=validation.success,validation},setErrorIdentifier=function(validation,index){var identifier,clone;return identifier="validationdynamicallydefined",identifier+=validation.identifier&&""!==validation.identifier&&null!==validation.identifier?validation.identifier.charAt(0).toUpperCase()+validation.identifier.slice(1).toLowerCase():index,clone=angular.copy(validation),clone.identifier=identifier,clone},setValidity=function(validation){return valid=validation.validator.apply(scope,validatorArgs),modelCtrl.$setValidity(validation.identifier,valid),valid===!0},Lazy(scopeValidations).map(hydrateDynamicallyDefinedValidation).map(setErrorIdentifier).map(setValidity).each(function(valid){return valid===!1?(dynamicallyDefinedValidation.errorCount++,dynamicallyDefinedValidation.latestElement=element,!1):!0}),valid}},onValidationComplete=function(fieldIsValid,value,validationAttributeValue,$element,model,ngModelController,$scope,customOnSuccess){fieldIsValid?($element.addClass("ValidationLiveSuccess"),$element.addClass($element.attr("validation-live-success-cls")),$element.removeClass($element.attr("validation-live-fail-cls")),customOnSuccess.call(this,value,validationAttributeValue,$element,model,ngModelController,$scope)):($element.removeClass("ValidationLiveSuccess"),$element.removeClass($element.attr("validation-live-success-cls")),$element.addClass($element.attr("validation-live-fail-cls")))},isCurrentlyDisplayingAnErrorMessageInATemplate=function(inputElement){var isCurrentlyDisplayingAnErrorMessageInATemplate=!1;return Lazy(customTemplates).each(function(template){return template.attr("templateUid")===inputElement.attr("templateUid")?(isCurrentlyDisplayingAnErrorMessageInATemplate=!0,currentlyDisplayedTemplate=template,!1):!0}),isCurrentlyDisplayingAnErrorMessageInATemplate},getValidationAttributeValue=function(attr,property,strict){var value;if(void 0===attr)return void 0;property=property||"value",value=attr;try{var json=JSOL.parse(attr)}catch(e){}return null!==json&&"object"==typeof json?(json.hasOwnProperty(property)?(hasProperty=!0,value=json[property]):(hasProperty=!1,value=void 0,strict!==!0&&(value=json.value)),value):strict===!0?void 0:value},getValidationAttributeByPropertyName=function(attr,property){var value;try{value=JSOL.parse(attr)[property]}catch(e){value=null}return value},getCustomTemplateIfDefined=function(attr,templateRetriever){var deferred,templateUrl,promise;deferred=$q.defer(),promise=deferred.promise;try{templateUrl=JSOL.parse(attr).template,void 0===templateUrl||null===templateUrl||""===templateUrl?deferred.reject("No template url specified."):promise=templateRetriever.getTemplate(templateUrl)}catch(e){deferred.reject("Error retrieving custom error template: "+e)}return promise},getValidatorByAttribute=function(customValidationAttribute){var validator;return Lazy(customValidations).each(function(validation){return validation.customValidationAttribute===customValidationAttribute?(validator=validation.validator,!1):!0}),validator},getValidationPriorityIndex=function(customValidationAttribute){var index;return Lazy(customValidations).each(function(validation,i){return validation.customValidationAttribute===customValidationAttribute?(index=i,!1):!0}),index},createValidationFormatterLink=function(formatterArgs,templateRetriever,q,timeout,log){return $q=q,$timeout=timeout,$log=log,function($scope,$element,$attrs,ngModelController){var customErrorMessage,errorMessage,errorMessageElement,modelName,model,propertyName,runCustomValidations,validationAttributeValue,customErrorTemplate;$timeout(function(){var getErrorMessageElement,addWatcherForDynamicallyDefinedValidations,addWatcherToWrapErrorInCustomTemplate,isValidValidationAttributeValue,getFormatterArgsErrorMessage,installErrorMessageElement,installSpecialErrorCases,rawCustomValidationAttribute=$attrs[formatterArgs.customValidationAttribute];validationAttributeValue=getValidationAttributeValue(rawCustomValidationAttribute),isValidValidationAttributeValue=validationAttributeValue&&"undefined"!==validationAttributeValue&&"false"!==validationAttributeValue,getErrorMessageElement=function(){var ifCheckboxOrRadio="";return/checkbox|radio/.test($element[0].type)&&(ifCheckboxOrRadio="checkboxradioerror "),angular.element("<span data-custom-validation-priorityIndex="+getValidationPriorityIndex(formatterArgs.customValidationAttribute)+" data-custom-validation-attribute="+formatterArgs.customValidationAttribute+" data-custom-field-name="+$element.attr("name")+' class="CustomValidationError '+ifCheckboxOrRadio+formatterArgs.customValidationAttribute+" "+propertyName+'property">'+errorMessage+"</span>")},addWatcherForDynamicallyDefinedValidations=function(){$scope.$watch(function(){return dynamicallyDefinedValidation.errorCount},function(){if(0!==dynamicallyDefinedValidation.errorCount){var currentElementFieldName=errorMessageElement.attr("data-custom-field-name"),latestValidatedFieldName=dynamicallyDefinedValidation.latestElement.attr("name");latestValidatedFieldName===currentElementFieldName&&errorMessageElement.html(dynamicallyDefinedValidation.errorMessage())}})},addWatcherToWrapErrorInCustomTemplate=function(template){var errorMessageToggled;customErrorTemplate=angular.element(template),customErrorTemplate.html(""),errorMessageToggled=function(){var templateUid=Math.random();"inline"===errorMessageElement.css("display")||"block"===errorMessageElement.css("display")?($element.attr("templateUid",templateUid),customErrorTemplate.attr("templateUid",templateUid),errorMessageElement.wrap(customErrorTemplate),customTemplates.push(angular.element(errorMessageElement.parents()[0]))):($element.removeAttr("templateUid"),errorMessageElement.parent().is("."+customErrorTemplate.attr("class"))&&errorMessageElement.unwrap(customErrorTemplate))},$scope.$watch(function(){return errorMessageElement.css("display")},errorMessageToggled),$scope.$on("errorMessageToggled",errorMessageToggled)},getFormatterArgsErrorMessage=function(){var errorMessage;return errorMessage="function"==typeof formatterArgs.errorMessage?formatterArgs.errorMessage(validationAttributeValue):formatterArgs.errorMessage},installErrorMessageElement=function(){errorMessage=getFormatterArgsErrorMessage(),errorMessageElement=getErrorMessageElement(),$element.after(errorMessageElement),errorMessageElement.hide(),"validationDynamicallyDefined"===formatterArgs.customValidationAttribute&&addWatcherForDynamicallyDefinedValidations(),getCustomTemplateIfDefined($attrs[formatterArgs.customValidationAttribute],templateRetriever).then(function(template){addWatcherToWrapErrorInCustomTemplate(template)}),customErrorMessage=getValidationAttributeByPropertyName($attrs[formatterArgs.customValidationAttribute],"message"),null!==customErrorMessage&&errorMessageElement.html(customErrorMessage)},installSpecialErrorCases=function(){if("validationNoSpace"===formatterArgs.customValidationAttribute&&$element.keyup(function(event){8===event.keyCode&&(model[propertyName]=$element.val().replace(/\s+$/,""))}),"validationConfirmPassword"===formatterArgs.customValidationAttribute){var passwordFieldId=$element.attr("passwordFieldId")||"password",passwordFieldSelector="#"+passwordFieldId,validationConfirmPasswordHandlerSelector=passwordFieldSelector+", #"+$element[0].id,confirmPasswordElement=$element,passwordElement=$element.parent().children(passwordFieldSelector);return void $($element.parent()).on("keyup blur",validationConfirmPasswordHandlerSelector,function(target){var passwordMatch,confirmPasswordIsDirty;confirmPasswordIsDirty=/dirty/.test(confirmPasswordElement.attr("class")),confirmPasswordIsDirty!==!1&&(passwordMatch=passwordElement.val()===$element.val(),ngModelController.$setValidity("validationconfirmpassword",passwordMatch),confirmPasswordElement.siblings(".CustomValidationError.validationConfirmPassword:first").toggle(!passwordMatch),onValidationComplete(passwordMatch,passwordMatch,validationAttributeValue,$element,model,ngModelController,$scope,function(){formatterArgs.success&&formatterArgs.success()}))})}"validationFieldRequired"===formatterArgs.customValidationAttribute&&$element.parents("form").find("label[for="+$element.attr("id")+"]").addClass("requiredFieldLabel")},runCustomValidations=function(eventType){function getCurrentlyDisplayingErrorMessage(){var fieldNameSelector,selector;return fieldNameSelector='[data-custom-field-name="'+$element.attr("name")+'"]',selector='.CustomValidationError[style="display: inline;"]'+fieldNameSelector+', .CustomValidationError[style="display: block;"]'+fieldNameSelector,isCurrentlyDisplayingAnErrorMessageInATemplate($element)?currentlyDisplayedTemplate.children(selector):$element.siblings(selector)}function getElementValue(){var value=$element.val().replace(/\s+$/,"");return/select/.test($element[0].type)&&(value=$element[0].options[$element[0].selectedIndex].innerHTML),/checkbox|radio/.test($element[0].type)&&(value=$element[0].checked===!0?"true":""),value}function toggleRequiredLabelClass(){""===value?$element.parents("form").find("label[for="+$element.attr("id")+"]").addClass("requiredFieldLabel"):$element.parents("form").find("label[for="+$element.attr("id")+"]").removeClass("requiredFieldLabel")}function runValidation(){return formatterArgs.validator(errorMessageElement,value,validationAttributeValue,$element,model,ngModelController,$scope,rawCustomValidationAttribute)}function getPropertyNameClass(pname){return pname.replace(".","\\.")}function whenIsNotCurrentlyDisplayingAnErrorMessage(){var classNames=".CustomValidationError."+formatterArgs.customValidationAttribute+"."+getPropertyNameClass(propertyName)+"property:first";$element.siblings(classNames).toggle(!isValid)}function whenIsNotCurrentlyDisplayingAnErrorMessageInATemplate(){currentErrorMessageValidator=getValidatorByAttribute(currentErrorMessage.attr("data-custom-validation-attribute")),currentErrorMessageIsStale=currentErrorMessageValidator(errorMessageElement.clone(),value,$attrs[currentErrorMessage.attr("data-custom-validation-attribute")],$element,model,ngModelController,$scope,rawCustomValidationAttribute),currentErrorMessagePriorityIndex=parseInt(currentErrorMessage.attr("data-custom-validation-priorityIndex"),10),currentErrorMessageIsOfALowerPriority=currentErrorMessagePriorityIndex>=getValidationPriorityIndex(formatterArgs.customValidationAttribute),(currentErrorMessageIsStale||!currentErrorMessageIsStale&&currentErrorMessageIsOfALowerPriority&&!isValid)&&(currentErrorMessage.hide(),$element.siblings(".CustomValidationError."+formatterArgs.customValidationAttribute+"."+getPropertyNameClass(propertyName)+"property:first").toggle(!isValid))}function whenIsCurrentlyDisplayingAnErrorMessageInATemplate(){currentErrorMessageValidator=getValidatorByAttribute(currentErrorMessage.attr("data-custom-validation-attribute")),currentErrorMessageIsStale=currentErrorMessageValidator(errorMessageElement,value,getValidationAttributeValue($attrs[currentErrorMessage.attr("data-custom-validation-attribute")]),$element,model,ngModelController),currentErrorMessagePriorityIndex=parseInt(currentErrorMessage.attr("data-custom-validation-priorityIndex"),10),currentErrorMessageIsOfALowerPriority=currentErrorMessagePriorityIndex>=getValidationPriorityIndex(formatterArgs.customValidationAttribute),(currentErrorMessageIsStale||!currentErrorMessageIsStale&&currentErrorMessageIsOfALowerPriority&&!isValid&&-1===currentlyDisplayedTemplate.children().attr("class").indexOf(formatterArgs.customValidationAttribute))&&(currentErrorMessage.hide(),$element.siblings(".CustomValidationError."+formatterArgs.customValidationAttribute+"."+getPropertyNameClass(propertyName)+"property:first").toggle(!isValid),$scope.$broadcast("errorMessageToggled"))}var isValid,value,customValidationBroadcastArg,currentlyDisplayingAnErrorMessage,currentErrorMessage,currentErrorMessageIsStale,currentErrorMessageValidator,currentErrorMessagePriorityIndex,currentErrorMessageIsOfALowerPriority,successFn,evaluateAsValid=!1;if("blur"!==eventType&&"runCustomValidations"!==eventType&&(formatterArgs.validateWhileEntering&&formatterArgs.validateWhileEntering===!0||(evaluateAsValid=!0)),!$element.hasClass("ng-pristine")||"runCustomValidations"===eventType){successFn=formatterArgs.success||function(){},currentErrorMessage=getCurrentlyDisplayingErrorMessage(),currentlyDisplayingAnErrorMessage=currentErrorMessage.length>0,value=getElementValue(),"validationFieldRequired"===formatterArgs.customValidationAttribute&&toggleRequiredLabelClass(),isValid=evaluateAsValid===!0?!0:runValidation(),ngModelController.$setValidity(formatterArgs.customValidationAttribute.toLowerCase(),isValid);var status=isValid===!0?" passed":" failed";return customValidationBroadcastArg={isValid:isValid,validation:$element.attr("id")+" "+formatterArgs.customValidationAttribute+status,model:model,controller:ngModelController,element:$element},currentlyDisplayingAnErrorMessage?isCurrentlyDisplayingAnErrorMessageInATemplate($element)||whenIsNotCurrentlyDisplayingAnErrorMessageInATemplate():whenIsNotCurrentlyDisplayingAnErrorMessage(),isCurrentlyDisplayingAnErrorMessageInATemplate($element)&&whenIsCurrentlyDisplayingAnErrorMessageInATemplate(),$scope.$broadcast("customValidationComplete",customValidationBroadcastArg),onValidationComplete(!(currentlyDisplayingAnErrorMessage||isCurrentlyDisplayingAnErrorMessageInATemplate($element)||!isValid),value,validationAttributeValue,$element,model,ngModelController,$scope,successFn),value}},isValidValidationAttributeValue===!0&&(modelName=$attrs.ngModel.substring(0,$attrs.ngModel.indexOf(".")),propertyName=$attrs.ngModel.substring($attrs.ngModel.indexOf(".")+1),model=$scope[modelName],installErrorMessageElement(),installSpecialErrorCases(),ngModelController.$parsers.push(function(){return runCustomValidations("input")}),$element.on("blur",function(event){runCustomValidations(event.type)}),$scope.$on("runCustomValidations",function(){runCustomValidations("runCustomValidations")}))})}},customValidationsModule=angular.module("directives.customvalidation.customValidations",["directives.invalidinputformatter.invalidInputFormatter","services.templateRetriever"]).factory("customValidationUtil",["templateRetriever","$q","$timeout","$log",function(templateRetriever,$q,$timeout,$log){return{createValidationLink:function(customValidation){return customValidations.push(customValidation),createValidationFormatterLink(customValidation,templateRetriever,$q,$timeout,$log)}}}]).directive("input",["customValidationUtil",function(customValidationUtil){return{require:"?ngModel",restrict:"E",link:customValidationUtil.createValidationLink(dynamicallyDefinedValidation)}}]).directive("select",["customValidationUtil",function(customValidationUtil){return{require:"?ngModel",restrict:"E",link:customValidationUtil.createValidationLink(dynamicallyDefinedValidation)}}]).directive("select",["customValidationUtil",function(customValidationUtil){return{require:"?ngModel",restrict:"E",link:customValidationUtil.createValidationLink({customValidationAttribute:"validationFieldRequired",validateWhileEntering:!0,errorMessage:"This is a required field",validator:function(errorMessageElement,val){return/\S/.test(val)}})}}]).directive("button",["customValidationUtil",function(customValidationUtil){return{restrict:"E",link:submitLink}}]).directive("a",["customValidationUtil",function(customValidationUtil){return{restrict:"E",link:submitLink}}]),{getValidationAttributeValue:getValidationAttributeValue}}(),angular.module("angularUiFormValidationApp",["ngCookies","ngResource","ngSanitize","ngRoute","directives.customvalidation.customValidationTypes"]).config(["$routeProvider",function($routeProvider){$routeProvider.when("/",{templateUrl:"views/main.html",controller:"MainCtrl"}).otherwise({redirectTo:"/"})}]),angular.module("angularUiFormValidationApp").controller("MainCtrl",["$scope",function($scope){$scope.awesomeThings=["HTML5 Boilerplate","AngularJS","Karma"],angular.extend($scope,{user:{username:null,usernameTwo:null,lastFourSSN:null,password:null,confirmPassword:null,email:null,firstName:null,lastName:null,state:"",isAdmin:null,birthdate:new Date,hasKids:null,save:function(){$scope.$broadcast("runCustomValidations",{forms:["demoForm"]}),$scope.$on("customValidationComplete",function(data){}),$scope.demoForm.$valid&&alert("Congratulations, the form is valid and ready to be submitted for further processing!")}},states:["","validState","invalidState1","invalidState2"],cities:["","validCity","invalidCity1","invalidCity2"],locallyDefinedValidations:[{identifier:"noOnes",errorMessage:"Cannot contain the number one",validator:function(errorMessageElement,val){return/1/.test(val)!==!0},validateWhileEntering:!0},{errorMessage:"Cannot contain the number two",validator:function(errorMessageElement,val){return/2/.test(val)!==!0},validateWhileEntering:!0}]})}]);