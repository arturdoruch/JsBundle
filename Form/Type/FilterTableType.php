<?php

namespace ArturDoruch\JsBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Form\Extension\Core\Type as Type;

/**
 * @author Artur Doruch <arturdoruch@interia.pl>
 */
class FilterTableType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('limit', Type\ChoiceType::class, array(
                    'choices' => $this->getLimitChoices($options),
                    'data' => $options['selected']
                ))
            ->add('reset', Type\ResetType::class)
            ->add('filter', Type\SubmitType::class);
    }


    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
                'limit_choices' => [
                    10,
                    20,
                    40,
                    60,
                    100,
                ],
                'selected' => 40
            ]);

        $resolver->addAllowedTypes('limit_choices', 'array');
        $resolver->addAllowedTypes('selected', 'integer');
    }


    private function getLimitChoices(array $options)
    {
        $choices = [];
        foreach ($options['limit_choices'] as $value) {
            $choices[$value] = $value;
        }

        return $choices;
    }
}
 