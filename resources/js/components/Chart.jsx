import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import Column2D from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

ReactFC.fcRoot(FusionCharts, Column2D, FusionTheme);

// Create a JSON object to store the chart configurations

// STEP 2 - Chart Data
const chartData = [
    {
        label: "Janvier",
        value: "290",
    },
    {
        label: "Fevrier",
        value: "260",
    },
    {
        label: "Mars",
        value: "180",
    },
    {
        label: "Avril",
        value: "140",
    },
    {
        label: "Mai",
        value: "115",
    },
    {
        label: "Juin",
        value: "100",
    },
    {
        label: "Juillet",
        value: "30",
    },
    {
        label: "Aout",
        value: "30",
    },
    {
        label: "Septembre",
        value: "300",
    },
    {
        label: "Octobre",
        value: "4000",
    },
     {
        label: "Novembre",
        value: "500",
    },
     {
        label: "Decembre",
        value: "200",
    },
];

const chartConfigs = {
    type: "column2d",
    width: "700",
    height: "400",
    dataFormat: "json",
    dataSource: {
        chart: {
            caption: "Evolution de la cotisation [Adefto]",
            subCaption: "FCFA par mois",
            xAxisName: "Mois",
            yAxisName: "Montant (FCFA)",
            numberSuffix: " FCFA",
            exportEnabled:"1",
            exportFileName:"Adefto Cotisations",
            theme: "fusion",
        },
        data: chartData,
    },
};

export default function Chart() {
    return <ReactFC {...chartConfigs} />;
}
