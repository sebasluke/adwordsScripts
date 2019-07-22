var reports = {
    1: 'CAMPAIGN_PERFORMANCE_REPORT ',
    2: 'ADGROUP_PERFORMANCE_REPORT ',
    3: 'AD_PERFORMANCE_REPORT ',
    4: 'KEYWORDS_PERFORMANCE_REPORT ',
    5: 'SEARCH_QUERY_PERFORMANCE_REPORT ',
    6: 'GENDER_PERFORMANCE_REPORT ',
    7: 'AGE_RANGE_PERFORMANCE_REPORT ',
    8: 'GEO_PERFORMANCE_REPORT ',
    9: 'AUDIENCE_PERFORMANCE_REPORT '
  };

  var allReports = {
    adNetworkType: {
        report: reports[2],
        specialCols: [
            "AdNetworkType1",
            "AdNetworkType2"        
            ]
        },
    deviceType: {
        report: reports[2],
        specialCols: [
            'Device'
            ]
        },
    agePerformance: {
        report: reports[2],
        specialCols: []
        }, 

    impressionShare: {
        report: reports[2],
        specialCols: [
            'ContentImpressionShare',
            'ContentRankLostImpressionShare',
            'SearchAbsoluteTopImpressionShare',
            'SearchBudgetLostAbsoluteTopImpressionShare',
            'SearchTopImpressionShare'
            ]
        },

    geography: {
        report: reports[8],
        specialCols: [
            'CityCriteriaId',
            'CountryCriteriaId'
        ]
        
    },
    dayOfTheWeek: {
        report: reports[2],
        specialCols: [
            'DayOfWeek'
        ]
    },
    hourOfDay: {
        report: reports[2],
        specialCols: [
            'HourOfDay'
        ]
    },
    genderPerformance: {
        report: reports[6],
        specialCols: []
    }, 
    audiencePerformance: {
        report: reports[9],
        specialCols: [
            'Criteria',
            'BidModifier',
            'Device',
            'UserListName'
        ]
    },
    ageAndDevice: {
        report: reports[7],
        specialCols: []
    }

}
function main() {
    var from = '20190501'
    var to = '20190610'
    var time = from + "," + to;
    var spreadsheetName = 'Auditoría de AdGroups GTC ' + time;
    var condition = "Impressions > 25 ";
    
    Logger.log("Ok, let's do it"); 

    var generalCols = [
      	"CampaignName",
        "AdGroupName",
        "Impressions",
        "Clicks",
        "Conversions",
        "Cost"        
    ];

    var spreadsheet = SpreadsheetApp.create(spreadsheetName)

    function allSpecialCols(report) {
        return [allReports[report].report, allReports[report].specialCols];
    }

    function reportQuery(reportName) {
        var reportAndCols = allSpecialCols(reportName); 
        var AdsAppReport = reportAndCols[0];
        var specialCols = reportAndCols[1]

        var cols = generalCols.concat(specialCols).toString(",") + " "
        return 'SELECT ' + cols +
                'FROM '  + AdsAppReport +
                ' WHERE ' + condition +
                'DURING ' + time
    }

    function exportToSheet(report, sheetName) {
        var sheet = spreadsheet.insertSheet(sheetName);
        report.exportToSheet(sheet);
    }

    function createReportAndExport(reportName) {
        var query = reportQuery(reportName);
        var report = AdsApp.report(query);
        exportToSheet(report, reportName);
        Logger.log(reportName + ' Made it dude!');
    }

    for(var property in allReports) {
        createReportAndExport(property)
        }

    Logger.log('That\'s all folks');
}
