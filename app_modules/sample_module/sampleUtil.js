/**
 * Created by deepak on 5/17/2017.
 */
var filePath="sample_module/sampleUtil.js";

var sampleDbCtrl = require('./sampleDbCtrl');

var utilCtrl={};

function uInsertData(data,callback)
{
    var functionName = _utils.formatFunctionName(filePath,uInsertData.name);
    var requiredParam=['firstName','lastName'];
    var missingParam=_utils.checkRequiredMissingParam(data.insertData,requiredParam);
    if(missingParam){
        callback(missingParam,null);
    }else{
        sampleDbCtrl.dbInsertData(data.insertData,function(err,result){
            if(err){
                callback(err,null);
            }else{
                var finalData={total_record_inserted:result};
                callback(null,finalData);
            }
        });
    }
}
utilCtrl.uInsertData=uInsertData;

function uUpdateData(data,callback)
{
    var functionName = _utils.formatFunctionName(filePath,uUpdateData.name);
    var requiredParam=['id','updateData'];
    var missingParam=_utils.checkRequiredMissingParam(data,requiredParam);
    if(missingParam){
        callback(missingParam,null);
    }else{
        sampleDbCtrl.dbUpdateData(data,function(err,result){
            if(err){
                callback(err,null);
            }else{
                var finalData={total_record_updated:result};
                callback(null,finalData);
            }
        });
    }
}
utilCtrl.uUpdateData=uUpdateData;

function uSelectData(data,callback)
{
    var functionName = _utils.formatFunctionName(filePath,uSelectData.name);

    if(_utils.isEmpty(data.id))
    {
        sampleDbCtrl.dbSelectAllData(data,function(err,result){
            if(err){
                callback(err,null);
            }else{
                callback(null,result);
            }
        });
    }
    else{
        sampleDbCtrl.dbSelectDataWithId(data,function(err,result){
            if(err){
                callback(err,null);
            }else{
                callback(null,result);
            }
        });
    }


}
utilCtrl.uSelectData=uSelectData;

function uDeleteData(data,callback)
{
    var functionName = _utils.formatFunctionName(filePath,uDeleteData.name);
    var requiredParam=['id'];
    var missingParam=_utils.checkRequiredMissingParam(data,requiredParam);
    if(missingParam){
        callback(missingParam,null);
    }else{
        sampleDbCtrl.dbDeleteData(data,function(err,result){
            if(err){
                callback(err,null);
            }else{
                var finalData={total_record_deleted:result};
                callback(null,finalData);
            }
        });
    }
}
utilCtrl.uDeleteData=uDeleteData;

module.exports=utilCtrl;

