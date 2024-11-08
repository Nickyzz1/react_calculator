// Definindo a interface do estado
export interface State {
  currentValue: string;  // Valor atual exibido na tela
  operator: string | null;  // Operador selecionado (como +, -, *, / ou null)
  previousValue: string | null;  // Valor anterior
  cientifcCalculator: boolean;  // Controle do modo científico
}

export const initialState: State = {
  currentValue: "0",
  operator: null,  // Inicialmente sem operador
  previousValue: null,
  cientifcCalculator: false,  // Inicialmente, o modo científico está desabilitado
};

// Função para manipular a entrada de números
export const handleNumber = (value: number, state: State): Partial<State> => {
  if (state.currentValue === "0") {
    return { currentValue: `${value}` };
  }

  return {
    currentValue: `${state.currentValue}${value}`,
  };
};

// Função para realizar o cálculo quando "=" é pressionado
export const handleEqual = (state: State): State => {
  const { currentValue, previousValue, operator } = state;

  const current = parseFloat(currentValue);
  const previous = parseFloat(previousValue || "0");

  const resetState: Partial<State> = {
    operator: null,  // Reseta o operador
    previousValue: null,  // Reseta o valor anterior
  };

  if (operator === "/") {
    return {
      currentValue: `${previous / current}`,
      ...resetState,
    };
  }

  if (operator === "*") {
    return {
      currentValue: `${previous * current}`,
      ...resetState,
    };
  }

  if (operator === "+") {
    return {
      currentValue: `${previous + current}`,
      ...resetState,
    };
  }

  if (operator === "-") {
    return {
      currentValue: `${previous - current}`,
      ...resetState,
    };
  }

  return state;
};

// Função principal que lida com as entradas (números, operadores, etc.)
const calculator = (
  type: string,
  value: number | string | undefined,
  state: State
): State => {
  switch (type) {
    case "number":
      return handleNumber(value as number, state) as State;
    case "operator":
      return {
        operator: value as string | null,  // Garante que o operador é string ou null
        previousValue: state.currentValue,
        currentValue: "0",  // Reseta o valor atual
      };
    case "equal":
      return handleEqual(state);
    case "clear":
      return initialState;  // Reseta para o estado inicial
    case "posneg":
      return {
        currentValue: `${parseFloat(state.currentValue) * -1}`, // Altera o sinal
      };
    case "percentage":
      return {
        currentValue: `${parseFloat(state.currentValue) * 0.01}`, // Calcula porcentagem
      };
    default:
      return state;  // Retorna o estado inalterado se o tipo não for encontrado
  }
};

export default calculator;
