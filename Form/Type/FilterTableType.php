<?php

namespace ArturDoruch\JsBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

/**
 * @author Artur Doruch <arturdoruch@interia.pl>
 */
class FilterTableType extends AbstractType
{
    public function getName()
    {
        return 'filter_table';
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('limit', 'choice', array(
                    'choices' => $this->getLimitChoices($options),
                    'data' => $options['selected']
                ))
            ->add('reset', 'reset')
            ->add('filter', 'submit');
    }


    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
                'limit_choices' => array(
                    10,
                    20,
                    40,
                    60,
                    100,
                ),
                'selected' => 40
            ));

        $resolver->setAllowedTypes(array(
                'limit_choices' => 'array',
                'selected' => 'integer'
            ));
    }

    private function getLimitChoices($options)
    {
        $choices = array();
        foreach ($options['limit_choices'] as $value) {
            $choices[$value] = $value;
        }

        return $choices;
    }
}
 