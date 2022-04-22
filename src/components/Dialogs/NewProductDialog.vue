<template>
  <div>
    <v-card-title>{{ $t("message.addproduct") }}</v-card-title>
    <v-form ref="productForm">
      <v-row>
        <v-col>
          <v-text-field
            single-line
            :label="$t('keys.name')"
            v-model="name"
            :rules="nameRules"
          >
          </v-text-field>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h4 style="line-height: 4">
            {{ $t("message.initialquantity") }}
          </h4>
        </v-col>
        <v-col>
          <v-text-field
            v-model="quantity"
            type="number"
            :rules="numberRules"
            min="0"
            single-line
          ></v-text-field>
        </v-col>
        <v-col>
          <v-combobox
            v-model="unity"
            label="Unidade"
            :items="unities"
          ></v-combobox>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="8">
          <v-switch
            :label="$t('message.controlshoppinglist')"
            :hint="$t('message.controlhint')"
            v-model="slControl"
            persistent-hint
          ></v-switch>
        </v-col>
        <v-col>
          <v-text-field
            :disabled="!slControl"
            :rules="numberRules"
            v-model="slQuantity"
            type="number"
            min="0"
            single-line
          ></v-text-field>
        </v-col>
      </v-row>
    </v-form>
  </div>
</template>

<script>
export default {
  data: () => ({
    name: "",
    quantity: 0,
    unity: "Un",
    slControl: false,
    slQuantity: 0,

    unities: ["Un", "Kg", "L"],
  }),
  computed: {
    nameRules() {
      return [(value) => value?.length > 0 || this.$t("error.required")];
    },
    numberRules() {
      return [
        (value) =>
          (value !== null && value >= 0) || this.$t("error.invalidvalue"),
        (value) =>
          this.unity !== "Un" ||
          parseInt(value) === parseFloat(value) ||
          this.$t("error.unity"),
      ];
    },
  },
  methods: {
    clearData() {
      this.name = "";
      this.quantity = 0;
      this.slControl = false;
      this.slQuantity = 0;
      this.$refs.productForm.resetValidation();
    },
    validateDate() {
      return this.$refs.productForm.validate();
    },

    getData() {
      if (this.validateDate()) {
        const { name, quantity, unity, slControl, slQuantity } = this;

        let convertedQuantity = 0;
        let convertedSlQuantity = 0;

        if (unity === "Un") {
          convertedQuantity = parseInt(quantity);
          convertedSlQuantity = parseInt(slQuantity);
        } else {
          convertedQuantity = parseFloat(quantity);
          convertedSlQuantity = parseFloat(slQuantity);
        }

        return {
          name,
          quantity: convertedQuantity,
          unity,
          rule: slControl ? convertedSlQuantity : null,
        };
      }

      return false;
    },
  },
};
</script>

<style></style>
