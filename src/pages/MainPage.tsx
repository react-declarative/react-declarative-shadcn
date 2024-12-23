import { FieldType, One, TypedField } from "react-declarative";
import { FormGroup } from "@/components/ui/form";

const frameworks = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const fields: TypedField[] = [
  {
    type: FieldType.Text,
    validation: {
      required: true,
    },
    name: "email",
    title: "Email",
    placeholder: "tripolskypetr@gmail.com",
    description: "This will not be shared.",
  },
  {
    type: FieldType.Text,
    validation: {
      required: true,
    },
    name: "email",
    title: "Password",
    placeholder: "Password",
    description: "Use a secure password.",
  },
  {
    type: FieldType.Text,
    inputRows: 3,
    validation: {
      required: true,
    },
    name: "bio",
    title: "Tell me about yourself",
    placeholder: "I am ...",
    description: "This will be used by AI.",
  },
  {
    type: FieldType.Component,
    style: {
      width: "100%",
    },
    element: () => (
      <FormGroup label="Account Type" description="Select your account type." />
    ),
  },
  {
    type: FieldType.Box,
    style: {
      width: "100%",
    },
    fields: [
      {
        type: FieldType.Radio,
        radioValue: "staff",
        title: "Staff",
        name: "account",
      },
      {
        type: FieldType.Radio,
        radioValue: "admin",
        title: "Admin",
        name: "account",
      },
      {
        type: FieldType.Radio,
        radioValue: "owner",
        title: "Owner",
        name: "account",
      },
    ],
  },
  {
    type: FieldType.Combo,
    name: "framework",
    title: "Favorite Framework",
    placeholder: "Select framework",
    description: "More important than your skills.",
    itemList: frameworks.map(({ value }) => value),
    tr: (value) => {
      const framework = frameworks.find(
        (framework) => framework.value === value
      );
      if (framework) {
        return framework.label;
      }
      return value;
    },
  },
  {
    type: FieldType.Switch,
    title: "Enable notifications",
    name: "notify",
  },
  {
    type: FieldType.Checkbox,
    title: "Accept terms & conditions",
    name: "agree",
  },
  {
    type: FieldType.Button,
    title: "Submit",
  },
];

export default function MainPage() {
  return <One fields={fields} />;
}
