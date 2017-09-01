/**
 * Created by chencheng on 2017/6/16.
 */

const _processAPI = (api) => {

	if(ENV.mock.isStart){
		return "/mockAPI"+api;
	}

	return api;
}

/**
 *
 * @type {{login, etlAppList, etlUploadAppPackage, etlAppGetProperties, etlAppStart, etlGetOperatorConf, etlGetOperatorMenu, etlGetEtlConf, etlSaveEtlConf, getScreenList, getScreenInfoAPI, getUploadImg, createScreenAPI, delScreenAPI, editScreenAPI, editScreen, lookScreen, getAnalysisList, createAnalysis, updateAnalysis, deleteAnalysis, getAnalysis, analysisAdvanceQuery, analysisQuery, getDataSources, getWorksheets, getWorksheetFields, uploadFile, DbtestLink, fileListEditName, delFileDataSource, delDbDataSource, configAPI, getDbAllDataAPI, completeDbAPI, getListDetailAPI, completeFileAPI, completeAddFileAPI, getWorkSheetByDataSourceAPI, getDataSourceListAPI, checkWorkSheetDataAPI, getWorkSheetList, getWorkSheetData, getWorkFileSheetData, getWorkFileSheet, getWorkDbSheet}}
 */
const EnumAPI = {

	login:_processAPI('/p/login'),

}

export default EnumAPI;
