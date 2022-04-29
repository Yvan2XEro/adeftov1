import React, { useMemo } from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);


export default function Chart({data}) {
    const chartConfigs = useMemo(()=>{
        return{
            type: "column2d",
            width: "850",
            height: "400",
            dataFormat: "json",
            dataSource: {
                chart: {
                    caption: "Evolution de la cotisation",
                    subCaption: "FCFA par mois",
                    xAxisName: "Mois",
                    yAxisName: "Montant (FCFA)",
                    numberSuffix: " FCFA",
                    exportEnabled: 1,
                    theme: "fusion",
                },
                data,
            },
        }
    }, [data])
    return <ReactFC {...chartConfigs} />;
}
