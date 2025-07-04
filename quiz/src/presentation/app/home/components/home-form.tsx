"use client";

import type React from "react";
import { useState } from "react";
import FormInput from "../../../components/form/form-input";
import FormButton from "../../../components/form/form-button";
import { useQuizStore } from "../../../../data/stores/quiz-store";

interface HomeFormProps {
  onSubmit: (playerName: string, playerUsername: string) => void;
}

export default function HomeForm({ onSubmit }: HomeFormProps) {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [errors, setErrors] = useState<{ name?: string; username?: string }>(
    {}
  );
  const isLoading = useQuizStore((state) => state.isLoading);
  const error = useQuizStore((state) => state.error);

  const validateName = (value: string) => {
    if (!value.trim()) return "Please enter your name";
    if (value.trim().length < 2) return "Name must be at least 2 characters";
    if (value.trim().length > 50) return "Name must be less than 50 characters";
    if (!/^[a-zA-Z\s]+$/.test(value.trim()))
      return "Name can only contain letters and spaces";
    return "";
  };

  const validateUsername = (value: string) => {
    if (!value.trim()) return "Please enter a username";
    if (value.length < 3) return "Username must be at least 3 characters";
    if (value.length > 20) return "Username must be less than 20 characters";
    if (!/^[a-zA-Z0-9_]+$/.test(value))
      return "Username can only contain letters, numbers and underscores";
    return "";
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setName(value);

    const error = validateName(value);
    setErrors((prev) => ({ ...prev, name: error }));
  };

  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.toLowerCase();
    setUsername(value);

    const validationError = validateUsername(value);
    setErrors((prev) => ({ ...prev, username: validationError }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const nameError = validateName(name);
    const usernameError = validateUsername(username);

    if (nameError || usernameError) {
      setErrors({ name: nameError, username: usernameError });
      return;
    }

    onSubmit(name.trim(), username.toLowerCase());
  };

  const isFormValid =
    name.trim() &&
    username.trim() &&
    !errors.name &&
    !errors.username &&
    !isLoading;

  return (
    <form
      id="home-form"
      onSubmit={handleSubmit}
      className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 space-y-6 border border-white/20"
    >
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="text-red-400 mr-2">⚠️</div>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        </div>
      )}

      <FormInput
        id="player-name-input"
        label="Full Name"
        placeholder="Enter your full name..."
        value={name}
        onChange={handleNameChange}
        error={errors.name}
        disabled={isLoading}
      />

      <FormInput
        id="player-username-input"
        label="Username"
        placeholder="Enter a unique username..."
        value={username}
        onChange={handleUsernameChange}
        error={errors.username}
        disabled={isLoading}
      />

      <FormButton
        id="start-quiz-button"
        type="submit"
        disabled={!isFormValid}
        className="w-full mt-8"
      >
        {isLoading ? (
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
            Starting Quiz...
          </div>
        ) : (
          "Start Quiz"
        )}
      </FormButton>
    </form>
  );
}
