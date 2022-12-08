import xss from 'xss-Clean';
import flash from 'connect-flash';
const OperatorLayout = {
  '>': '$gt',
  '>=': '$gte',
  '=': '$eq',
  '<': '$lt',
  '<=': '$lte',
} as const;

type OperatorSignal = keyof typeof OperatorLayout;
type OperatorExpression = typeof OperatorLayout[OperatorSignal];

type OperatorObj = {
  [key: string]: OperatorExpression;
};

type Inequality = {
  [key: string]: number;
};

type QueryType = {
  [key: string]: Inequality;
};

const numericFilters = 'price>40,rating>=4';
const queryObject: QueryType = { price: { $gt: 40 }, rating: { $gte: 4 } };

if (numericFilters) {
  const operatorMap: OperatorObj = {
    '>': '$gt',
    '>=': '$gte',
    '=': '$eq',
    '<': '$lt',
    '<=': '$lte',
  };
  const regEx = /\b(<|>|>=|=|<|<=)\b/g;
  let filters = numericFilters.replace(
    regEx,
    (match) => `-${operatorMap[match]}-`
  );
  const options = ['price', 'rating'];

  filters.split(',').forEach((item) => {
    const [field, operator, value] = item.split('-');
    if (options.includes(field)) {
      queryObject[field] = { [operator]: Number(value) };
    }
  });

  console.log('fileters', filters);
}
