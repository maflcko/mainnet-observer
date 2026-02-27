const ANNOTATIONS = [];
const MOVING_AVERAGE_DAYS = MOVING_AVERAGE_30D;
const NAMES = [
  "same block",
  "≤ 1 block",
  "≤ 6 blocks",
  "≤ 144 blocks",
  "≤ 2016 blocks",
];
const PRECISION = 2;
let START_DATE = new Date();
START_DATE.setFullYear(new Date().getFullYear() - 5);

const CSVs = [
  fetchCSV("/csv/date.csv"),
  fetchCSV("/csv/inputs_spending_prev_1_blocks_sum.csv"),
  fetchCSV("/csv/inputs_spending_prev_6_blocks_sum.csv"),
  fetchCSV("/csv/inputs_spending_prev_144_blocks_sum.csv"),
  fetchCSV("/csv/inputs_spending_prev_2016_blocks_sum.csv"),
  fetchCSV("/csv/inputs_spend_in_same_block_sum.csv"),
  fetchCSV("/csv/inputs_sum.csv"),
  fetchCSV("/csv/inputs_coinbase_sum.csv"),
];

function preprocess(input) {
  let data = {
    date: [],
    same_block: [],
    prev_1: [],
    prev_6: [],
    prev_144: [],
    prev_2016: [],
  };

  const [
    dates,
    prev1,
    prev6,
    prev144,
    prev2016,
    sameBlock,
    inputs,
    coinbaseInputs,
  ] = input;

  for (let i = 0; i < dates.length; i++) {
    const totalInputs =
      parseFloat(inputs[i].inputs_sum) -
      parseFloat(coinbaseInputs[i].inputs_coinbase_sum);
    data.date.push(+new Date(dates[i].date));
    if (totalInputs === 0) {
      data.same_block.push(0);
      data.prev_1.push(0);
      data.prev_6.push(0);
      data.prev_144.push(0);
      data.prev_2016.push(0);
      continue;
    }
    data.same_block.push(
      (parseFloat(sameBlock[i].inputs_spend_in_same_block_sum) / totalInputs) *
        100,
    );
    data.prev_1.push(
      (parseFloat(prev1[i].inputs_spending_prev_1_blocks_sum) / totalInputs) *
        100,
    );
    data.prev_6.push(
      (parseFloat(prev6[i].inputs_spending_prev_6_blocks_sum) / totalInputs) *
        100,
    );
    data.prev_144.push(
      (parseFloat(prev144[i].inputs_spending_prev_144_blocks_sum) /
        totalInputs) *
        100,
    );
    data.prev_2016.push(
      (parseFloat(prev2016[i].inputs_spending_prev_2016_blocks_sum) /
        totalInputs) *
        100,
    );
  }

  return data;
}

const DATA_KEYS = ["same_block", "prev_1", "prev_6", "prev_144", "prev_2016"];

function chartDefinition(d, movingAverage) {
  let option = multiLineChart(
    d,
    DATA_KEYS,
    NAMES,
    movingAverage,
    PRECISION,
    START_DATE,
    ANNOTATIONS,
  );
  option.tooltip["valueFormatter"] = (v) =>
    v != null ? Number(v).toFixed(PRECISION) + "%" : "-";
  option.yAxis.axisLabel = { formatter: (v) => v.toFixed(0) + "%" };
  return option;
}
