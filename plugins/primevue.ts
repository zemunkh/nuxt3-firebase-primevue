import { defineNuxtPlugin } from "#app";
import PrimeVue from "primevue/config";
import Button from "primevue/button";
import ColumnGroup from 'primevue/columngroup';
import VirtualScroller from 'primevue/virtualscroller';
import Skeleton from 'primevue/skeleton';
import InputText from 'primevue/inputtext';
import Checkbox from 'primevue/checkbox';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import MultiSelect from 'primevue/multiselect';
import Dropdown from 'primevue/dropdown';
import TriStateCheckbox from 'primevue/tristatecheckbox';
import InputSwitch from 'primevue/inputswitch';
import Menubar from "primevue/menubar";
import Sidebar from "primevue/sidebar";
import PanelMenu from "primevue/panelmenu";
import Fieldset from "primevue/fieldset";

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(PrimeVue, {ripple: true});
    nuxtApp.vueApp.component('Button', Button);
    nuxtApp.vueApp.component('ColumnGroup', ColumnGroup);
    nuxtApp.vueApp.component('VirtualScroller', VirtualScroller);
    nuxtApp.vueApp.component('Skeleton', Skeleton);
    nuxtApp.vueApp.component('InputText', InputText);
    nuxtApp.vueApp.component('Checkbox', Checkbox);
    nuxtApp.vueApp.component('DataTable', DataTable);
    nuxtApp.vueApp.component('Column', Column);
    nuxtApp.vueApp.component('MultiSelect', MultiSelect);
    nuxtApp.vueApp.component('Dropdown', Dropdown);
    nuxtApp.vueApp.component('TriStateCheckbox', TriStateCheckbox);
    nuxtApp.vueApp.component('InputSwitch', InputSwitch);
    nuxtApp.vueApp.component("Menubar", Menubar);
    nuxtApp.vueApp.component("Sidebar", Sidebar);
    nuxtApp.vueApp.component("PanelMenu", PanelMenu);
    nuxtApp.vueApp.component("Fieldset", Fieldset);
    //other components that you need
});