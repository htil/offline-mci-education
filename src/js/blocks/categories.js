export const Categories = {
  cat_logic: {
  name: "Logic",
  colour: "%{BKY_LOGIC_HUE}",
  modules: [
    "controls_if",
    "controls_ifelse",
    "logic_compare",
  ]
  },

  cat_loops: {
    name: "Loops",
    colour: "%{BKY_LOOPS_HUE}",
    modules: ["controls_repeat", "wait_seconds"],
  },

  cat_math: {
    name: "Math",
    colour: "%{BKY_MATH_HUE}",
    modules: [
      "math_number",
      "math_arithmetic",
      "math_random_float"
    ]
  },

  cat_sep: {
    gap: 0
  },

  cat_data: {
    name: "Data",
    colour: 330,
    custom: "DATA",
    modules: ["plot_raw", "getRaw"]
  },

  cat_vars: {
    name: "Variables",
    colour: 100,
    custom: "VARIABLE",
    modules: []
  },

  cat_list: {
    name: "List",
    colour: 50,
    modules: [
        "lists_create_empty",
        "lists_create_with"
    ]
  }
};
