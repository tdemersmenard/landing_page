import { type InputHTMLAttributes, type Ref, useId } from "react";

type Props = InputHTMLAttributes<HTMLInputElement> & { label: string; error?: string; ref?: Ref<HTMLInputElement> };

export function Field({ label, error, ...input }: Props) {
  const id = useId();
  return (
    <div>
      <label htmlFor={id} className="font-bold">
        {label}
      </label>
      <input
        id={id}
        required
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-erreur` : undefined}
        className={`mt-1 block w-full rounded-lg border-2 bg-white px-4 py-3 text-base ${error ? "border-[#b3261e]" : "border-encre"}`}
        {...input}
      />
      {error && (
        <p id={`${id}-erreur`} className="mt-1 font-semibold text-[#b3261e]">
          {error}
        </p>
      )}
    </div>
  );
}
