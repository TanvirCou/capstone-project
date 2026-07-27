# AI Workflow Comparison

## Overview

This exercise compared two different AI prompting approaches while building the same feature: a Settings page using HTML, CSS, and JavaScript. The objective was to understand how the quality of a prompt affects the quality of the generated code, review effort, correctness, accessibility, and overall development workflow.

## Round One – Vague Prompt

The first implementation used a simple prompt:

> "Create a settings page for my website."

The AI generated a basic settings form with the required input fields. However, the implementation lacked several important features. Validation was minimal, error messages were inconsistent, accessibility attributes such as `aria-invalid` were missing, and the JavaScript code was not well organized. Although the page worked, it required significant manual review and improvements before it met the project requirements.

## Round Two – Precise Prompt

The second implementation used a detailed prompt that included file references, project constraints, validation rules, accessibility requirements, expected behavior, and a verification step. The generated solution was much more complete. It included semantic HTML, responsive styling, reusable JavaScript functions, proper client-side validation, accessible form controls, and better code organization. The output closely matched the project requirements and required only minor adjustments during review.

## Comparison

The difference between the two implementations was clear. The vague prompt produced a usable interface quickly, but additional time was needed to identify missing validation, improve accessibility, and refactor the code. The precise prompt required more time to write, but it reduced the overall development effort because the generated code already followed the expected standards.

The second version also handled edge cases more effectively. It prevented empty submissions, validated email addresses correctly, displayed validation messages beneath the corresponding fields, and disabled the submit button while processing. Accessibility was improved by adding labels, visible focus styles, keyboard-friendly navigation, and `aria-invalid` attributes.

## AI Mistake Found

During the review process, I noticed that the generated code did not clear validation messages after users corrected invalid input. As a result, error messages remained visible even when the input became valid. I updated the validation logic so that error messages were removed dynamically once each field passed validation.

## Conclusion

This exercise demonstrated that writing a detailed and structured prompt produces higher-quality AI-generated code. Although creating the detailed prompt took more time initially, it significantly reduced manual review, debugging, and refactoring. Adding clear requirements, accessibility guidelines, constraints, expected behavior, and a verification step resulted in a more reliable, maintainable, and production-ready implementation.
