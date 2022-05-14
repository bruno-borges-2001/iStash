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
            counter
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
            v-model="unit"
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
import { v4 as uuidv4 } from "uuid";

export default {
  data: () => ({
    id: null,
    name: "",
    quantity: 0,
    unit: "Un",
    slControl: false,
    slQuantity: 0,

    unities: ["Un", "Kg", "L"],
  }),
  computed: {
    nameRules() {
      return [
        (value) => value?.length > 0 || this.$t("error.required"),
        (value) => value?.length < 25 || this.$t("error.lengtherror"),
      ];
    },
    numberRules() {
      return [
        (value) =>
          (value !== null && value >= 0) || this.$t("error.invalidvalue"),
        (value) =>
          this.unit !== "Un" ||
          parseInt(value) === parseFloat(value) ||
          this.$t("error.unit"),
      ];
    },
  },
  methods: {
    clearData() {
      this.id = null;
      this.name = "";
      this.quantity = 0;
      this.slControl = false;
      this.slQuantity = 0;
      this.$refs.productForm.resetValidation();
    },
    validateData() {
      return this.$refs.productForm.validate();
    },

    setEditData(data) {
      const { id, name, quantity, rule, unit } = data;
      this.id = id;
      this.name = name;
      this.quantity = quantity;
      this.slControl = rule !== null;
      this.slQuantity = rule ?? 0;
      this.unit = unit;
    },

    getData() {
      if (this.validateData()) {
        const { name, quantity, unit, slControl, slQuantity } = this;

        let convertedQuantity = 0;
        let convertedSlQuantity = 0;

        if (unit === "Un") {
          convertedQuantity = parseInt(quantity);
          convertedSlQuantity = parseInt(slQuantity);
        } else {
          convertedQuantity = parseFloat(quantity);
          convertedSlQuantity = parseFloat(slQuantity);
        }

        return {
          id: this.id ?? uuidv4(),
          name,
          quantity: convertedQuantity,
          unit,
          rule: slControl ? convertedSlQuantity : null,
          lastUpdatedBy: this.$store.state.currentUser.name,
          lastUpdatedAt: new Date(),
        };
      }

      return false;
    },
  },
};
</script>

<style></style>
